# Js Table of Contents Generator

The `TableOfContents` JavaScript class dynamically generates a table of contents (ToC) for a specified container element on your webpage. It extracts headings (`<h1>` through `<h6>`, with a specified starting level) and creates a clickable ToC, allowing users to navigate to different sections of the content easily.

## Features

- Dynamically scans specified container for headings (`h1`-`h6`)
- Filters headings based on specified minimum and maximum levels
- Automatically generates unique IDs for headings that don't have them
- Option to preserve existing IDs (new feature!)
- Smart handling of special characters and Unicode in heading text
- Handles duplicate headings by appending numbers to IDs
- Generates a nested list representing the headings hierarchy
- Creates hyperlinked items in the ToC for direct navigation

## Usage

To use this class, you'll need to include the JavaScript file in your HTML document and then instantiate the class with the appropriate parameters. Here's a step-by-step guide:

1. **Include the JavaScript Class**: Add the `toc.js` script to your HTML document.

    ```html
    <script src="path/to/toc.js"></script>
    ```

    or you can grab it from CDN:

    ```html
    <script src="https://data.colouree.com/apps/toc-js/toc.js"></script>
    ```

2. **Instantiate and Generate the ToC**: In your HTML document, call the `generate` method of the `TableOfContents` class after the document is fully loaded. Use the `DOMContentLoaded` event listener to ensure the timing.

    ```html
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        // Instantiate the class with container ID, starting heading level, max heading level, and preserve IDs option
        const toc = new TableOfContents('#content', 'h1', 'h3', true); // Will include h1 to h3, preserve existing IDs
        // Generate the table of contents
        toc.generate();
      });
    </script>
    ```

    The constructor takes four parameters:
    - `containerId`: The ID of the container element to scan for headings
    - `startingHeading`: The minimum heading level to include (e.g., 'h1')
    - `maxHeading`: The maximum heading level to include (e.g., 'h3')
    - `preserveIds`: (optional) Whether to keep existing IDs (defaults to true)

## Example

You can find a working example in the `example/index.html` file, which demonstrates the practical usage of the Table of Contents generator.

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
```