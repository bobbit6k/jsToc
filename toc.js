class TableOfContents {
    constructor(containerId, startingHeading) {
      this.containerId = containerId;
      this.startingHeading = startingHeading;
      this.validHeadings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
      this.encounteredIds = new Set(); // To ensure uniqueness of IDs
    }
  
    generate() {
      const contentArea = document.querySelector(this.containerId);
      const tocContainer = document.querySelector('#toc');
      if (!contentArea || !tocContainer) return;
  
      const startingIndex = this.validHeadings.indexOf(this.startingHeading.toUpperCase());
      if (startingIndex === -1) return;
  
      // Filter headings that have an ID
      const headings = Array.from(contentArea.querySelectorAll(this.validHeadings.slice(startingIndex).join(', ')))
                            .filter(heading => heading.id && !this.encounteredIds.has(heading.id));
  
      // Update encounteredIds with found IDs to ensure uniqueness
      headings.forEach(heading => this.encounteredIds.add(heading.id));
  
      if (headings.length === 0) return;
  
      const tocList = document.createElement('ul');
      this._createList(headings, tocList, startingIndex);
  
      tocContainer.appendChild(tocList);
    }
  
    _createList(headings, currentList, previousLevel) {
      headings.forEach(heading => {
        const level = this.validHeadings.indexOf(heading.tagName);
        const item = document.createElement('li');
  
        // Create a hyperlink for each heading
        const link = document.createElement('a');
        link.setAttribute('href', `#${heading.id}`);
        link.textContent = heading.textContent;
        item.appendChild(link);
  
        if (level === previousLevel) {
          currentList.appendChild(item);
        } else if (level > previousLevel) {
          const newList = document.createElement('ul');
          newList.appendChild(item);
          currentList.lastChild.appendChild(newList);
          currentList = newList;
        } else {
          let stepsUp = previousLevel - level;
          let parentList = currentList.parentNode;
          for (let i = 1; i < stepsUp; i++) {
            parentList = parentList.parentNode;
          }
          parentList.appendChild(item);
          currentList = parentList.lastChild;
        }
        previousLevel = level;
      });
    }
  }
  
