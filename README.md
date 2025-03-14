# Reactive tooltips for Meteor

> **NOTE**: This is a simple fork of [lookback:tooltips](https://github.com/lookcbak/tooltips), without the coffeescript dependency or the version pinning.
>
---

Forget about adding clunky Bootstrap packages. The `cunneen:tooltips` package provides tooltips "The Meteor Way" – the reactive way! Barebones, minimal and functional.

## Install

```bash
meteor add cunneen:tooltips
```

## Usage

You can now use the `tooltips` (singleton) template in your layouts/templates.

```html
<template name="main">
  <p>Some content.</p>

  {{ > tooltips }}
</template>
```

**You must style the `show` and `hide` classes on a tooltip.**

Commonly, you would give the tooltip element these basic styles (see the `_tooltip.scss` file in the `example` folder):

```css
.tooltip {
  z-index: 1001;
  pointer-events: none;
  transition: opacity .1s ease-out;
  opacity: 0;
}

.tooltip.hide {
  opacity: 0;
}

.tooltip.show {
  opacity: 1;
}
```

### Basic

Attach a tooltip to an element with the `data-tooltip` data attribute:

```html
<template name="main">
<p>Some content.</p>

<p>
  <button data-tooltip="I'm a tooltip!">A tooltip trigger</button>
</p>

{{ > tooltips }}
</template>
```

The tooltip will show when hovering over the button.

### Markup

You can embed markup in your tooltips as well:

```html
<button data-tooltip="I'm a tooltip with <strong>markup!</strong>">A tooltip trigger</button>
```

Or refer to an external element containing the markup:

```html
<div id="my-element" aria-hidden="true">
  <strong>I'm a tooltip with some more <em>markup!</em></strong>
</div>

<button data-tooltip-element="#my-element">A tooltip trigger</button>
```

Remember to hide the external tooltip elements with CSS!

### Direction

You may specify the **direction** of the tooltip around the element as well, with the `data-tooltip-direction` attribute.

```html
<template name="main">
<p>Some content.</p>

<p>
<button data-tooltip="I'm a tooltip to the left!" data-tooltip-direction="w">A tooltip trigger</button>
</p>

{{ > tooltips }}
</template>
```

The `data-tooltip-direction` attribute takes these values:

- `n` - Top *(default)*
- `s` - Bottom
- `e` - Right
- `w` - Left

### Offsets

Tooltips support **offsets** from their element when you specify the `data-tooltip-top` and `data-tooltip-left` data attributes on the element.

```html
<template name="main">
<p>Some content.</p>

<p>
<button data-tooltip="I'm a tooltip!" data-tooltip-top="50">A tooltip trigger</button>
</p>

{{ > tooltips }}
</template>
```
The tooltip in the example above will be offset 50 pixels *to the north* (upwards on screen).

Both attributes takes positive and negative numbers, intepreted as **pixels**.

### Triggers

Tooltips support different **triggers**, other then on hover, which is the default. Supported triggers are:

- `hover`
- `click`
- `focus`
- `manual`

To use the manual trigger, trigger these events on the element:

- `tooltips:show`
- `tooltips:hide`
- `tooltips:toggle`

```html
<template name="main">
<p>Some content.</p>

<p>
  <button data-tooltip="Tooltip on Click" data-tooltip-trigger="click">Click Me!</button>
</p>

{{ > tooltips }}
</template>
```

Please see the example app for more examples.

## Styling

You can use `data-tooltip-classes` to define custom classes for your tooltip. It adds additional classes to the `.tooltip` element.

```html
<p>
  <button data-tooltip="I have custom classes" data-tooltip-classes="custom-class another-custom-class">Hurrah for styling!</button>
</p>
```

The following styles that are included are inlined on the tooltip element itself:

```html
<div class="tooltip tooltip--top" style="position: absolute; top: 100px; left: 100px;">
<div class="inner">Content</div>
</div>
```

## Helper classes

The package adds some helper classes to the tooltip element, for styling and transitioning.

The main tooltip element has these classes:

- `tooltip`
- `tooltip--top`, `tooltip--bottom`, `tooltip--left`, `tooltip--right` – For the tooltip direction. Usable for adding CSS arrows and other stuff to a tooltips, depending on its direction. *Defaults to* `tooltip--top`.

The content wrapper has the `inner` class. Usable for separate styling as well as for transitioning.

When hovering over the triggering element, a `show` class will be added to the main tooltip element. When the tooltip is inactive, it'll have the `hide` class.

## Disabling for other viewports

It's possible to completely disable the tooltips, or just for a certain viewport. By setting the `Tooltips.disable` option (defaults to `false`), you can pass in `true` to disable all tooltips, or a [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) string which disables all tooltips for that viewport.

```js
// Disable for all
Tooltips.disable = true;

// Disabling for all touch devices:
// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
var isTouch = !!('ontouchstart' in window) || !!(window.DocumentTouch && document instanceof DocumentTouch);
Tooltips.disable = isTouch;

// Disable for devices/browsers over 500 px in width
Tooltips.disable = '(min-width: 500px)';

// Disable for devices/browser below 400 px in width
Tooltips.disable = '(max-width: 400px)';
```

You can also disable individual tooltips directly from the markup, by setting the `data-tooltip-disable` attribute:

```html
<!-- Disables *this* tooltip for browsers below 400px in width. -->
<button data-tooltip="I'm a tooltip!" data-tooltip-disable="(max-width: 400px)">A tooltip trigger</button>
```

## API

This packages exposes an API in the `Tooltips` namespace on the client:

```js
// Set a tooltip. Second argument is optional. If passed, it'll be
// the CSS position for the tooltip.
Tooltips.set('Text', {top: 10, left: 30});

// Get the tooltip. Creates a reactive dependency, and returns an object.
var tip = Tooltips.get();

/*
=>
  tip.text == 'Text';
  tip.css == {top: 0, left: 0};
  tip.direction == 'tooltip--top';
*/

// Disable all tooltips. Can be `true|false` or a `matchMedia` query.
// Defaults to false.
Tooltips.disable = true;

// Set position of the tooltip. Second argument is optional. If passed, it'll
// be the direction of the tooltip, and must be one of `n`, `s`, `e`, `w`
// (north, south, east, west).
Tooltips.setPosition({top: 10, left: 30}, 'n');

// Hide all tooltips
Tooltips.hide();
```

## Version history


## Contributions

Contributions are welcome. Please open issues and/or file Pull Requests.

***
