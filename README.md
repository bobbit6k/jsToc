# Table of Contents Generator

The `TableOfContents` JavaScript class dynamically generates a table of contents (ToC) for a specified container element on your webpage. It extracts headings (`<h1>` through `<h6>`, with a specified starting level) that have unique `id` attributes and creates a clickable ToC, allowing users to navigate to different sections of the content easily.

## Why a TOC (Table of Contents) matters?

A table of contents (ToC) in digital content enhances user navigation and accessibility, improves content organization, and can positively affect search engine visibility. Utilizing appropriate headings for ToC creation not only lends a professional appearance to documents but also facilitates easier content access, making it a recommended practice for improving reader engagement and website usability.

## Features

- Dynamically scans specified container for headings (`h1`-`h6`).
- Filters headings to include only those with unique `id` attributes.
- Generates a nested list representing the headings hierarchy.
- Creates hyperlinked items in the ToC for direct navigation.

## Usage

To use this class, you'll need to include the JavaScript file in your HTML document and then instantiate the class with the appropriate parameters. Here's a step-by-step guide:

1. **Include the JavaScript Class**: Add the `TableOfContents.js` script to your HTML document.

    ```html
    <script src="path/to/toc.js"></script>
    ```

2. **Instantiate and Generate the ToC**: In your HTML document, call the `generate` method of the `TableOfContents` class after the document is fully loaded. Use the `DOMContentLoaded` event listener to ensure the timing.

    ```html
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        // Instantiate the class with the container ID and starting heading level
        const toc = new TableOfContents('#article', 'h2');
        // Generate the table of contents
        toc.generate();
      });
    </script>
    ```

## Example

Given an HTML structure like this:

```html
<div id="toc"></div>
<section id="article">
    <h2 id="section1">Section 1</h2>
    <p>Content under section 1</p>
    <h3 id="subsection1">Subsection 1.1</h3>
    <p>Content under subsection 1.1</p>
    <h2 id="section2">Section 2</h2>
    <p>Content under section 2</p>
</section>
```

After executing the generate method, the <div id="toc"> element will be filled with the following structure, providing a nested, clickable table of contents:

```html
<ul>
    <li><a href="#section1">Section 1</a>
        <ul>
            <li><a href="#subsection1">Subsection 1.1</a></li>
        </ul>
    </li>
    <li><a href="#section2">Section 2</a></li>
</ul>
```
