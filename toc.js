class TableOfContents {
  constructor(containerId, startingHeading = 'H1', maxHeading = 'H6', preserveIds = true) {
    this.containerId = containerId;
    this.startingHeading = startingHeading.toUpperCase();
    this.maxHeading = maxHeading.toUpperCase();
    this.validHeadings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    this.encounteredIds = new Set();
    this.preserveIds = preserveIds;
    
    if (!this.validHeadings.includes(this.startingHeading)) {
      throw new Error(`Invalid starting heading: ${startingHeading}`);
    }
    if (!this.validHeadings.includes(this.maxHeading)) {
      throw new Error(`Invalid max heading: ${maxHeading}`);
    }
    if (this.validHeadings.indexOf(this.startingHeading) > 
        this.validHeadings.indexOf(this.maxHeading)) {
      throw new Error('Starting heading cannot be larger than max heading');
    }
  }

  _generateId(text, existingId = null) {
    if (this.preserveIds && existingId && !this.encounteredIds.has(existingId)) {
      this.encounteredIds.add(existingId);
      return existingId;
    }

    let slug = text.toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    if (!slug || /^\d/.test(slug)) {
      slug = 'section-' + slug;
    }
    
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
    
    if (!contentArea || !tocContainer) {
      throw new Error('Required elements not found');
    }

    const startIndex = this.validHeadings.indexOf(this.startingHeading);
    const maxIndex = this.validHeadings.indexOf(this.maxHeading);
    const validRange = this.validHeadings.slice(startIndex, maxIndex + 1);
    
    const headings = Array.from(contentArea.querySelectorAll(validRange.join(',')))
      .map(heading => {
        const newId = this._generateId(heading.textContent, heading.id);
        if (heading.id !== newId) {
          heading.id = newId;
        }
        return {
          element: heading,
          level: this.validHeadings.indexOf(heading.tagName)
        };
      });

    if (headings.length === 0) {
      tocContainer.innerHTML = '<p>No headings found</p>';
      return;
    }

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    let currentList = tocList;
    let lastLevel = startIndex;
    const lists = [tocList]; // Stack to keep track of lists

    headings.forEach(({ element, level }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${element.id}`;
      link.textContent = element.textContent;
      item.appendChild(link);

      if (level === lastLevel) {
        // Same level, append to current list
        currentList.appendChild(item);
      } else if (level > lastLevel) {
        // Deeper level, create new nested list
        const newList = document.createElement('ul');
        if (currentList.lastElementChild) {
          currentList.lastElementChild.appendChild(newList);
        } else {
          currentList.appendChild(newList);
        }
        newList.appendChild(item);
        lists.push(newList);
        currentList = newList;
      } else {
        // Going back up, find the appropriate parent list
        const levelsUp = lastLevel - level;
        for (let i = 0; i < levelsUp && lists.length > 1; i++) {
          lists.pop();
        }
        currentList = lists[lists.length - 1];
        currentList.appendChild(item);
      }

      lastLevel = level;
    });

    tocContainer.innerHTML = '';
    tocContainer.appendChild(tocList);
  }
}