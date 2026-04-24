# NUJRA GitHub Pages Website

This is a static website prototype for NUJRA.

## Structure

- `index.html`: Home
- `about.html`: About NUJRA
- `join.html`: Join instructions
- `events.html`: Event archive
- `resources.html`: Life/research resources
- `contact.html`: Contact forms
- `css/style.css`: Design
- `js/main.js`: Search/filter/data rendering
- `data/events.json`: Event data
- `data/members.json`: Member data
- `data/resources.json`: Resource data

## Editing

For normal updates, edit JSON files:

- Add seminars/events: `data/events.json`
- Add member information: `data/members.json`
- Add resource items: `data/resources.json`

## Form links to replace

Search for these placeholders and replace them with real Google Form URLs:

- `https://forms.gle/REPLACE_WITH_JOIN_FORM`
- `https://forms.gle/REPLACE_WITH_CONTACT_FORM`
- `https://forms.gle/REPLACE_WITH_LEAVE_FORM`

Also replace:

- `mailto:example@example.com`

## Publish on GitHub Pages

Settings > Pages > Deploy from a branch > main > /root
