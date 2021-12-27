# msc-portable-video

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/msc-portable-video) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/19645/branches/513164/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=19645&bid=513164)

Video - the most popular content in web page. Visitors always attracted with vivid contents. That's why editor like to place video contents in web page. We could see these video modules fixed in web page corner easily, such as YouTube. It's a very common effect nowadays. But what if visitors could place video module where they want. Or adjust video size for more smooth browsing they like. That's the main purpose why I design &lt;msc-portable-video /> this web component. With a few setting and everything will be all set.

![<msc-portable-video />](https://blog.lalacube.com/mei/img/preview/msc-portable-video.png)

## Basic Usage

&lt;msc-portable-video /&gt; is a web component. All we need to do is put the required script into your HTML document. Then follow <msc-portable-video />'s html structure and everything will be all set.

- Required Script
```html
<script 
  type="module"
  src="https://your-domain/wc-msc-portable-video.js"
</script>
```

- Structure

Put &lt;msc-portable-video /&gt; into HTML document. It will have different functions and looks with attribute mutation.
```html
<msc-portable-video>
  <script type="application/json">
    {
      "safearea": 20,
      "sensor": 26,
      "cooltime": 0,
      "embed": "https://www.youtube.com/embed/Ff7k1zxBe1I?autoplay=1&playsinline=1",
      "align": { // optional
        "width": 253.125,
        "height": 450,
        "corner": "bottom-left" // top-left, top-right, bottom-right, bottom-left
      },
      "allow": "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", // optional, set Feature Policy
      "calltoaction": {
        "link": "https://www.youtube.com/watch?v=Ff7k1zxBe1I",
        "content": "VISIT"
      }
    }
  </script>
</msc-portable-video>
```

Otherwise, developers could also choose `remoteconfig` to fetch config for &lt;msc-portable-video /&gt;.

```html
<msc-portable-video
  remoteconfig="https://617751a89c328300175f58b7.mockapi.io/api/v1/portableVideo"
  ...
></msc-portable-video>
```

## JavaScript Instantiation

&lt;msc-portable-video /&gt; could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { MscPortableVideo } from 'https://your-domain/wc-msc-portable-video.js';

//use DOM api
const nodeA = document.createElement('msc-portable-video');
document.body.appendChild(nodeA);
nodeA.embed = 'https://embed-domain/embed-video-url.html';
nodeA.calltoaction = { ... };

// new instance with Class
const nodeB = new MscPortableVideo();
document.body.appendChild(nodeB);
nodeA.embed = 'https://embed-domain/embed-video-url.html';
nodeA.calltoaction = { ... };

// new instance with Class & default config
const config = {
  "safearea": 20,
  "sensor": 26,
  "cooltime": 0,
  "embed": "https://www.youtube.com/embed/Ff7k1zxBe1I?autoplay=1&playsinline=1",
  "align": {
    "width": 253.125,
    "height": 450,
    "corner": "bottom-left"
  },
  "allow": "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", 
  "calltoaction": {
    "link": "https://www.youtube.com/watch?v=Ff7k1zxBe1I",
    "content": "VISIT"
  }
};
const nodeC = new MscPortableVideo(config);
document.body.appendChild(nodeC);
</script>
```

## Style Customization

&lt;msc-portable-video /&gt; uses CSS variables to hook uploader trigger theme & drop zone. That means developer could easy change it into the looks you like.

```html
<style>
msc-portable-video {
  --msc-portable-video-theme: #fff;
  --msc-portable-video-shadow: rgba(0,0,0,.65);
  --msc-portable-video-border-radius: 26px;
  --msc-portable-video-btn-close-bg: url(data:image/svg+xml;base64,...) rgba(0,0,0,.5) no-repeat 50% 50%/auto 60%;
}
</style>
```

## Attributes

&lt;msc-portable-video /&gt; supports some attributes to let it become more convenience & useful.

- **embed**

Set embed for different embed url.

```html
<msc-portable-video
  embed="https://www.youtube.com/embed/Ff7k1zxBe1I?autoplay=0&playsinline=1"
  ...
></msc-portable-video>
```

- **safearea**

Set safearea size (px) for viewport gap. Value should higher or equal `0`. Default is `20`.

```html
<msc-portable-video
  safearea="20"
  ...
></msc-portable-video>
```

- **sensor**

Set sensor size (px) for resize action area. Value should higher or equal `1`. Default is `26`.

```html
<msc-portable-video
  sensor="26"
  ...
></msc-portable-video>
```

- **cooltime**

Set cooltime (second) for &lt;msc-portable-video /&gt; display or not. Once setted and user tap "close" button, &lt;msc-portable-video /&gt; won't render until exceed cooltime's value. Value should higher or equal `0`. Default is `0`.

```html
<msc-portable-video
  cooltime="0"
  ...
></msc-portable-video>
```

- **calltoaction**

Set "call to action" data. This should be JSON string and must contains "`link`"、"`content`" for rendering. This attribute is optional.
```html
<msc-portable-video
  calltoaction='{"link":"?","content":"VISIT"}'
  ...
></msc-portable-video>
```


## Properties

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| embed | String | Getter / Setter for embed. |
| safearea | Number | Getter / Setter for safearea size. |
| sensor | Number | Getter / Setter for sensor size. |
| cooltime | Number | Getter / Setter for cooltime. |
| calltoaction | Object | Getter / Setter for "call to action" data. Object must contains "`link`"、"`content`". |

## Methods

| Method Name | Parameter Type | Description |
| ----------- | ----------- | ----------- |
| align | Object | Set width / height / corner for <msc-portable-video /> rendering. Be careful corner only accpets "`top-left`"、"`top-right`"、"`bottom-right`"、"`bottom-left`" these four values. |
| close | N/A | Turn off &lt;msc-portable-video /&gt; |


## Events

| Event Signature | Description |
| ----------- | ----------- |
| msc-portable-video-cta-click | Fired when &lt;msc-portable-video /&gt; "call to action" clicked. Developers could get original click event from `event.detail.baseEvent` to do preventDefault behavior. |
| msc-portable-video-close| Fired when &lt;msc-portable-video /&gt; closed. |
| msc-portable-video-drag | Fired when &lt;msc-portable-video /&gt; dragging. |
|msc-portable-video-resize | Fired when &lt;sc-portable-video /&gt; resizing. Developers could gather extra information `x`、`y`、`width`、`height`、`type` from event.detail. |

## Reference
- [&lt;msc-portable-video /&gt;](https://blog.lalacube.com/mei/webComponent_msc-portable-video.html)

