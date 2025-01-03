class TableOfContents {
  constructor(containerId, startingHeading = 'H1', maxHeading = 'H6') {
    this.containerId = containerId;
    this.startingHeading = startingHeading.toUpperCase();
    this.maxHeading = maxHeading.toUpperCase();
    this.validHeadings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    this.encounteredIds = new Set();
    
    // Validate inputs
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

  _generateId(text) {
    let slug = text.toLowerCase()
      .trim()
      .normalize('NFD')                 // Normalize unicode characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^\w\s-]/g, '')        // Remove special chars
      .replace(/\s+/g, '-')            // Replace spaces with -
      .replace(/-+/g, '-')             // Replace multiple - with single -
      .replace(/^-+|-+$/g, '');        // Remove leading/trailing -
    
    // If slug is empty or starts with a number, prepend 'section'
    if (!slug || /^\d/.test(slug)) {
      slug = 'section-' + slug;
    }
    
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
    
    if (!contentArea || !tocContainer) {
      throw new Error('Required elements not found');
    }

    const startIndex = this.validHeadings.indexOf(this.startingHeading);
    const maxIndex = this.validHeadings.indexOf(this.maxHeading);
    const validRange = this.validHeadings.slice(startIndex, maxIndex + 1);
    
    // Get and process all valid headings
    const headings = Array.from(contentArea.querySelectorAll(validRange.join(', ')))
      .map(heading => {
        // Generate or validate existing ID
        if (!heading.id || this.encounteredIds.has(heading.id)) {
          heading.id = this._generateId(heading.textContent);
        } else {
          this.encounteredIds.add(heading.id);
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

    // Create the TOC structure
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    
    let currentList = tocList;
    let previousLevel = startIndex;

    headings.forEach(({ element, level }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      
      link.href = `#${element.id}`;
      link.textContent = element.textContent;
      item.appendChild(link);

      if (level === previousLevel) {
        currentList.appendChild(item);
      } else if (level > previousLevel) {
        const newList = document.createElement('ul');
        newList.appendChild(item);
        currentList.lastChild.appendChild(newList);
        currentList = newList;
      } else {
        // Go up the necessary number of levels
        let levelsUp = previousLevel - level;
        while (levelsUp > 0 && currentList.parentElement?.parentElement) {
          currentList = currentList.parentElement.parentElement;
          levelsUp--;
        }
        currentList.appendChild(item);
      }
      
      previousLevel = level;
    });

    // Clear and update the TOC container
    tocContainer.innerHTML = '';
    tocContainer.appendChild(tocList);
  }
}