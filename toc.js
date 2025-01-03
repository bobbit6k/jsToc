class TableOfContents {
    constructor(containerId, startingHeading, maxHeading = 'H6') {
      this.containerId = containerId;
      this.startingHeading = startingHeading;
      this.maxHeading = maxHeading;
      this.validHeadings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
      this.encounteredIds = new Set(); // To ensure uniqueness of IDs
    }

    _generateId(text) {
      // Convert to lowercase, replace spaces with hyphens, remove special chars
      let slug = text.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/-+/g, '-');     // Replace multiple - with single -
      
      // If slug is empty, use 'section'
      if (!slug) slug = 'section';
      
      // Ensure uniqueness
      let uniqueSlug = slug;
      let counter = 1;
      while (this.encounteredIds.has(uniqueSlug)) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      }
      
      this.encounteredIds.add(uniqueSlug);
      return uniqueSlug;
    }
  
    generate() {
      const contentArea = document.querySelector(this.containerId);
      const tocContainer = document.querySelector('#toc');
      if (!contentArea || !tocContainer) return;
  
      const startingIndex = this.validHeadings.indexOf(this.startingHeading.toUpperCase());
      if (startingIndex === -1) return;
  
      // Get all headings and generate IDs for those that don't have them
      // Get the range of headings between starting and max levels
      const startIndex = this.validHeadings.indexOf(this.startingHeading.toUpperCase());
      const maxIndex = this.validHeadings.indexOf(this.maxHeading.toUpperCase());
      const validRange = this.validHeadings.slice(startIndex, maxIndex + 1);
      
      const headings = Array.from(contentArea.querySelectorAll(validRange.join(', ')))
                            .map(heading => {
                              if (!heading.id || this.encounteredIds.has(heading.id)) {
                                heading.id = this._generateId(heading.textContent);
                              }
                              this.encounteredIds.add(heading.id);
                              return heading;
                            });
  
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
