# Js Table of Contents Generator

The `TableOfContents` JavaScript class dynamically generates a table of contents (ToC) for a specified container element on your webpage. It extracts headings (`<h1>` through `<h6>`, with a specified starting level) that have unique `id` attributes and creates a clickable ToC, allowing users to navigate to different sections of the content easily.

## Features

- Dynamically scans specified container for headings (`h1`-`h6`).
- Filters headings to include only those with unique `id` attributes.
- Generates a nested list representing the headings hierarchy.
- Creates hyperlinked items in the ToC for direct navigation.

## Usage

The `example` folder contains a practical demonstration of how to install and use the TableOfContents class.

To use this class, you'll need to include the JavaScript file in your HTML document and then instantiate the class with the appropriate parameters. Here's a step-by-step guide:

1. **Include the JavaScript Class**: Add the `toc.js` script to your HTML document.

    ```html
    <script src="path/to/toc.js"></script>
    ```

    or you can grab it from jsdelivr.net cdn

    ```html
    <script src="https://cdn.jsdelivr.net/gh/bobbit6k/jsToc@latest/toc-min.js"></script>
    ```

    

2. **Instantiate and Generate the ToC**: In your HTML document, call the `generate` method of the `TableOfContents` class after the document is fully loaded. Use the `DOMContentLoaded` event listener to ensure the timing.

    ```html
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        // Instantiate the class with container ID, starting heading level, and max heading level
        const toc = new TableOfContents('#article', 'h2', 'h3'); // Will include h2 and h3, exclude h4-h6
        // Generate the table of contents
        toc.generate();
      });
    </script>
    ```

    The constructor takes three parameters:
    - `containerId`: The ID of the container element to scan for headings
    - `startingHeading`: The minimum heading level to include (e.g., 'h2')
    - `maxHeading`: (optional) The maximum heading level to include (default: 'h6')

## Example

Given an HTML structure like this:

```html
<div id="toc"></div>
<section id="article">
    <h2>Section 1</h2>
    <p>Content under section 1</p>
    <h3>Subsection 1.1</h3>
    <p>Content under subsection 1.1</p>
    <h2>Section 2</h2>
    <p>Content under section 2</p>
</section>
```

After executing the generate method, the ```html <div id="toc">``` element will be filled with the following structure, providing a nested, clickable table of contents:

```html
<ul>
    <li><a href="#section-1">Section 1</a>
        <ul>
            <li><a href="#subsection-1-1">Subsection 1.1</a></li>
        </ul>
    </li>
    <li><a href="#section-2">Section 2</a></li>
</ul>
