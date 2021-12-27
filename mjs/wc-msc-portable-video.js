import { _wcl } from './common-lib.js';
import { _wccss } from './common-css.js';

const borderSize = 4;
const indicatorTimes = 8;
const inlineSize = 450;
const blockSize = 253.125;
const isLSReady = _wcl.isAPISupport('localStorage');
const LSKey = 'msc-portable-video';

const defaults = {
  cooltime: 0, // second
  embed: '',
  safearea: 20, // px
  sensor: 26, // px,
  calltoaction: {
    link: '',
    content:''
  }
};

const objectAttrs = ['calltoaction'];

const custumEvents = {
  click: 'msc-portable-video-cta-click',
  close: 'msc-portable-video-close',
  drag: 'msc-portable-video-drag',
  resize: 'msc-portable-video-resize'
};

const { down:evtDown, move:evtMove, up:evtUp } = _wcl.pursuer();

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}

:host{position:absolute;inset-inline-start:0;inset-block-start:0;inline-size:fit-content;block-size:fit-content;pointer-events:none;z-index:9999;user-select:none;-webkit-user-select:none;}
:host{
  --msc-portable-video-theme: #fff;
  --msc-portable-video-shadow: rgba(0,0,0,.65);
  --msc-portable-video-border-radius: 26px;
  --msc-portable-video-btn-close-bg: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nMjQnIHdpZHRoPScyNCc+PHBhdGggZD0nTTAgMGgyNHYyNEgweicgZmlsbD0nbm9uZScvPjxwYXRoIGZpbGw9JyNmZmYnIGQ9J00xOSA2LjQxIDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Jy8+PC9zdmc+) rgba(0,0,0,.5) no-repeat 50% 50%/auto 60%;
}
:host([data-action]){z-index:11000;}

.main {
  --border-radius-close: 9px;
  --close-filter-none: opacity(0);
  --close-filter-default: opacity(.5);
  --close-filter-progress: opacity(.85);
  --close-filter-active: opacity(1);
  --close-filter: var(--close-filter-default);
  --scale-default: scale(1);
  --scale-active: scale(1.02);
  --scale: var(--scale-default);

  --cta-block-size: 32px;
  --cta-filter-default: opacity(0);
  --cta-filter-active: opacity(1);
  --cta-filter: var(--cta-filter-default);

  --inset-inline-start: -${inlineSize}px;
  --inset-block-start: -${blockSize}px;
  --inline-size: ${inlineSize}px;
  --block-size: ${blockSize}px;
}
.main--manuver{}
.main{position:fixed;inset-inline-start:var(--inset-inline-start);inset-block-start:var(--inset-block-start);inline-size:var(--inline-size);block-size:var(--block-size);display:block;pointer-events:auto;outline:0 none;z-index:1;}
.main[data-action]::after{position:absolute;inset-inline-start:0;inset-block-start:0;inline-size:100%;block-size:100%;content:'';background:transparent;}
.main[data-action='resizeLT']::after,.main[data-action='resizeRB']::after{cursor:nwse-resize;}
.main[data-action='resizeRT']::after,.main[data-action='resizeLB']::after{cursor:nesw-resize;}
.main:focus {
  --close-filter: var(--close-filter-progress);
  --cta-filter: var(--cta-filter-active);
}
.main:focus .sensors {
  --indicator-opacity: var(--indicator-opacity-active);
  --indicator-transform: var(--indicator-transform-active);

  --lt-opacity: var(--opacity-active);
  --rt-opacity: var(--opacity-active);
  --lb-opacity: var(--opacity-active);
  --rb-opacity: var(--opacity-active);
  --lt-transform: var(--lt-transform-active);
  --rt-transform: var(--rt-transform-active);
  --lb-transform: var(--lb-transform-active);
  --rb-transform: var(--rb-transform-active);
}
.embed{inline-size:100%;block-size:100%;border:0 none;display:block;border-radius:var(--msc-portable-video-border-radius);overflow:hidden;transition:transform 150ms ease;transform:var(--scale);}

.sensors {
  --sensor-size: ${defaults.sensor}px;
  --border-size: ${borderSize}px;
  
  --duration: 200ms;

  --indicator-times: ${indicatorTimes};
  --indicator-inline-size: calc(100% - var(--sensor-size) * 2);
  --indicator-block-size: calc(var(--border-size) * var(--indicator-times));
  --indicator-bar-size: 40%;
  --indicator-transform-default: translateY(calc(((var(--indicator-times) - 1) / 2) * 100%));
  --indicator-transform-active: translateY(0);
  --indicator-opacity-default: 0;
  --indicator-opacity-active: 1;
  --indicator-opacity: var(--indicator-opacity-default);
  --indicator-transform: var(--indicator-transform-default);

  --opacity-default: 0;
  --opacity-active: 1;

  --transform-default: translate(0,0);
  --lt-transform-active: translate(calc(var(--border-size) * -1), calc(var(--border-size) * -1));
  --rt-transform-active: translate(var(--border-size), calc(var(--border-size) * -1));
  --lb-transform-active: translate(calc(var(--border-size) * -1), var(--border-size));
  --rb-transform-active: translate(var(--border-size), var(--border-size));

  --lt-opacity: var(--opacity-default);
  --rt-opacity: var(--opacity-default);
  --lb-opacity: var(--opacity-default);
  --rb-opacity: var(--opacity-default);
  --lt-transform: var(--transform-default);
  --rt-transform: var(--transform-default);
  --lb-transform: var(--transform-default);
  --rb-transform: var(--transform-default);
}
.sensors--manuver{}
.sensors{position:absolute;inset-inline-start:0;inset-block-start:0;inline-size:100%;block-size:100%;pointer-events:none;}
.sensor{position:absolute;inline-size:var(--sensor-size);block-size:var(--sensor-size);transition:opacity var(--duration) ease,transform var(--duration) ease;will-change:opacity,transform;pointer-events:auto;}
.sensor__LT{inset-inline-start:0;inset-block-start:0;border-inline-start:var(--border-size) solid var(--msc-portable-video-theme);border-block-start:var(--border-size) solid var(--msc-portable-video-theme);border-top-left-radius:var(--msc-portable-video-border-radius);opacity:var(--lt-opacity);transform:var(--lt-transform);filter:drop-shadow(-1px -1px 0px var(--msc-portable-video-shadow));cursor:nwse-resize;}
.sensor__RT{inset-inline-end:0;inset-block-start:0;border-inline-end:var(--border-size) solid var(--msc-portable-video-theme);border-block-start:var(--border-size) solid var(--msc-portable-video-theme);border-top-right-radius:var(--msc-portable-video-border-radius);opacity:var(--rt-opacity);transform:var(--rt-transform);filter:drop-shadow(1px -1px 0px var(--msc-portable-video-shadow));cursor:nesw-resize;}
.sensor__LB{inset-inline-start:0;inset-block-end:0;border-inline-start:var(--border-size) solid var(--msc-portable-video-theme);border-block-end:var(--border-size) solid var(--msc-portable-video-theme);border-bottom-left-radius:var(--msc-portable-video-border-radius);opacity:var(--lb-opacity);transform:var(--lb-transform);filter:drop-shadow(-1px 1px 0px var(--msc-portable-video-shadow));cursor:nesw-resize;}
.sensor__RB{inset-inline-end:0;inset-block-end:0;border-inline-end:var(--border-size) solid var(--msc-portable-video-theme);border-block-end:var(--border-size) solid var(--msc-portable-video-theme);border-bottom-right-radius:var(--msc-portable-video-border-radius);opacity:var(--rb-opacity);transform:var(--rb-transform);filter:drop-shadow(1px 1px 0px var(--msc-portable-video-shadow));cursor:nwse-resize;}
.indocator{position:absolute;inset-inline-start:var(--sensor-size);inset-block-start:calc(var(--indicator-block-size) * -1);inline-size:var(--indicator-inline-size);block-size:var(--indicator-block-size);pointer-events:auto;background:transparent;cursor:move;}
.indocator::before{position:absolute;content:'';inset-inline:0;inset-block:0;margin:auto;inline-size:var(--indicator-bar-size);block-size:var(--border-size);background-color:var(--msc-portable-video-theme);border-radius:var(--border-size);transition:opacity var(--duration) ease calc(var(--duration) / 3),transform var(--duration) ease calc(var(--duration) / 3);will-change:opacity,transform;opacity:var(--indicator-opacity);transform:var(--indicator-transform);box-shadow: 0 0 0 2px var(--msc-portable-video-shadow);}

.btn__close{position:absolute;inset-inline-end:var(--msc-portable-video-border-radius);inset-block-start:var(--msc-portable-video-border-radius);inline-size:48px;block-size:36px;border-radius:var(--border-radius-close);background:var(--msc-portable-video-btn-close-bg);transition:filter 100ms ease;filter:var(--close-filter);}
.btn__close:active{transform:scale(.95);}
.btn__cta{position:absolute;inset-inline:0 0;inset-block:0 0;margin:auto;color:#fff;background-color:rgba(0,0,0,.8);block-size:var(--cta-block-size);line-height:var(--cta-block-size);padding:0 24px;border-radius:var(--cta-block-size);box-sizing:border-box;max-inline-size:120px;text-align:center;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transition:filter 200ms ease;filter:var(--cta-filter);}

@media (hover: none) {
  .main {
    --close-filter: var(--close-filter-active);
  }

  .sensors {
    --indicator-opacity: var(--indicator-opacity-active);
    --indicator-transform: var(--indicator-transform-active);
  }
}

@media (hover: hover) {
  :host(:hover) .sensors {
    --indicator-opacity: var(--indicator-opacity-active);
    --indicator-transform: var(--indicator-transform-active);

    --lt-opacity: var(--opacity-active);
    --rt-opacity: var(--opacity-active);
    --lb-opacity: var(--opacity-active);
    --rb-opacity: var(--opacity-active);
    --lt-transform: var(--lt-transform-active);
    --rt-transform: var(--rt-transform-active);
    --lb-transform: var(--lb-transform-active);
    --rb-transform: var(--rb-transform-active);
  }

  :host(:hover) .main {
    --close-filter: var(--close-filter-progress);
    --cta-filter: var(--cta-filter-active);
  }

  .btn__close:hover {
    --close-filter: var(--close-filter-active);
  }
}

/* states */
:host .main[data-action] {
  --scale:var(--scale-active);
  --close-filter: var(--close-filter-none);
  --cta-filter: var(--cta-filter-default);
}

.main[data-action='drag'] .sensors {
  --lt-opacity: var(--opacity-default);
  --rt-opacity: var(--opacity-default);
  --lb-opacity: var(--opacity-default);
  --rb-opacity: var(--opacity-default);
  --lt-transform: var(--lt-transform-default);
  --rt-transform: var(--rt-transform-default);
  --lb-transform: var(--lb-transform-default);
  --rb-transform: var(--rb-transform-default);
}

.main[data-action*='resize'] .sensors {
  --indicator-opacity: var(--indicator-opacity-default);
  --indicator-transform: var(--indicator-transform-default);
}

.main[data-action='resizeLT'] .sensors {
  --rt-opacity: var(--opacity-default);
  --lb-opacity: var(--opacity-default);
  --rb-opacity: var(--opacity-default);
  --rt-transform: var(--rt-transform-default);
  --lb-transform: var(--lb-transform-default);
  --rb-transform: var(--rb-transform-default);
}

.main[data-action='resizeRT'] .sensors {
  --lt-opacity: var(--opacity-default);
  --lb-opacity: var(--opacity-default);
  --rb-opacity: var(--opacity-default);
  --lt-transform: var(--lt-transform-default);
  --lb-transform: var(--lb-transform-default);
  --rb-transform: var(--rb-transform-default);
}

.main[data-action='resizeLB'] .sensors {
  --lt-opacity: var(--opacity-default);
  --rt-opacity: var(--opacity-default);
  --rb-opacity: var(--opacity-default);
  --lt-transform: var(--lt-transform-default);
  --rt-transform: var(--rt-transform-default);
  --rb-transform: var(--rb-transform-default);
}

.main[data-action='resizeRB'] .sensors {
  --lt-opacity: var(--opacity-default);
  --rt-opacity: var(--opacity-default);
  --lb-opacity: var(--opacity-default);
  --lt-transform: var(--lt-transform-default);
  --rt-transform: var(--rt-transform-default);
  --lb-transform: var(--lb-transform-default);
}
</style>

<div class="main main--manuver" tabindex="0">
  <iframe class="embed" allowfullscreen></iframe>
  <div class="sensors sensors--manuver">
    <em class="sensor sensor__LT stuff" data-action="resizeLT">left-top</em>
    <em class="sensor sensor__RT stuff" data-action="resizeRT">right-top</em>
    <em class="sensor sensor__LB stuff" data-action="resizeLB">left-bottom</em>
    <em class="sensor sensor__RB stuff" data-action="resizeRB">right-bottom</em>
    <em class="indocator" data-action="drag"></em>
  </div>
  <a class="btn__cta" target="msc-portable-video" rel="noreferrer noopener" hidden>VISIT</a>
  <a href="#close" class="btn__close stuff" title="close portable-video" aria-title="close portable-video">close</a>
</div>
`;

// Houdini Props and Vals
if (CSS?.registerProperty) {
  CSS.registerProperty({
    name: '--msc-portable-video-theme',
    syntax: '<color>',
    inherits: true,
    initialValue: '#fff'
  });

  CSS.registerProperty({
    name: '--msc-portable-video-shadow',
    syntax: '<color>',
    inherits: true,
    initialValue: 'rgba(0,0,0,.65)'
  });

  CSS.registerProperty({
    name: '--msc-portable-video-border-radius',
    syntax: '<length>',
    inherits: true,
    initialValue: '26px'
  });
}

export class MscPortableVideo extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: '',
      ddController: '',      
      dX: 0,
      dY: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      action: ''
    };

    // nodes
    this.#nodes = {
      styleSheet: this.shadowRoot.querySelector('style'),
      main: this.shadowRoot.querySelector('.main'),
      embed: this.shadowRoot.querySelector('.embed'),
      sensors: this.shadowRoot.querySelector('.sensors'),
      btnClose: this.shadowRoot.querySelector('.btn__close'),
      btnCTA: this.shadowRoot.querySelector('.btn__cta')
    }

    // config
    this.#config = {
      ...defaults,
      ...config // new MscPortableVideo(config)
    };

    // evts
    this._onDown = this._onDown.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onUp = this._onUp.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onCTAClick = this._onCTAClick.bind(this);
    this._onResize = this._onResize.bind(this);
  }

  async connectedCallback() {
    const { sensors, btnClose, btnCTA, embed } = this.#nodes;
    const { config, error } = await _wcl.getWCConfig(this);

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // allow
    if (this.#config?.allow) {
      embed.setAttribute('allow', this.#config.allow);
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this._upgradeProperty(key));

    // evts
    this.#data.controller = new AbortController();
    const signal = this.#data.controller.signal;
    sensors.addEventListener(evtDown, this._onDown, { signal });
    btnClose.addEventListener('click', this._onClose, { signal });
    btnCTA.addEventListener('click', this._onCTAClick, { signal });
    window.addEventListener('resize', this._onResize, { signal });

    this._render();
  }

  disconnectedCallback() {
    if (this.#data?.controller) {
      this.#data.controller.abort();
    }
  }

  _format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      this.#config[attrName] = defaults[attrName];
    } else {
      switch (attrName) {
        case 'calltoaction': {
          let calltoaction = defaults.calltoaction;
          try {
            calltoaction = JSON.parse(newValue);
          } catch(err) {
            console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
          }

          this.#config[attrName] = calltoaction;
          break;
        }
        case 'cooltime': {
          const cooltime = +newValue;
          this.#config[attrName] = (isNaN(cooltime) || cooltime < 0 ) ? defaults.cooltime : cooltime;
          break;
        }
        case 'safearea': {
          const safearea = +newValue;
          this.#config[attrName] = (isNaN(safearea) || safearea < 0) ? defaults.safearea : safearea;
          break;
        }
        case 'sensor': {
          const sensor = +newValue;
          this.#config[attrName] = (isNaN(sensor) || sensor <= 0) ? defaults.sensor : sensor;
          break;
        }
        default:
          this.#config[attrName] = newValue;
          break;
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!MscPortableVideo.observedAttributes.includes(attrName)) {
      return;
    }

    this._format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'calltoaction': {
        const { link, content } = this.calltoaction;
        const { btnCTA } = this.#nodes;
        if (link && content) {
          btnCTA.href = link;
          btnCTA.textContent = content;
          btnCTA.hidden = false;
        } else {
          btnCTA.hidden = true;
        }
        break;
      }
      case 'embed':
        this.#nodes.embed.src = this.embed;
        break;
      case 'sensor': 
        this.#data.minSize = this.sensor * 6;

        _wcl.addStylesheetRules('.sensors--manuver', {
          '--sensor-size': `${this.sensor}px`,
        }, this.#nodes.styleSheet);
        break;
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // MscPortableVideo.observedAttributes
  }

  _upgradeProperty(prop) {
    let value;

    if (MscPortableVideo.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (this.hasAttribute(prop)) {
          value = this.getAttribute(prop);
        } else {
          value = objectAttrs.includes(prop) ? JSON.stringify(this.#config[prop]) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  set cooltime(value) {
    if (value) {
      this.setAttribute('cooltime', value);
    } else {
      this.removeAttribute('cooltime');
    }
  }

  get cooltime() {
    return this.#config.cooltime;
  }

  set embed(value) {
    if (value) {
      this.setAttribute('embed', value);
    } else {
      this.removeAttribute('embed');
    }
  }

  get embed() {
    return this.#config.embed;
  }

  set safearea(value) {
    if (value) {
      this.setAttribute('safearea', value);
    } else {
      this.removeAttribute('safearea');
    }
  }

  get safearea() {
    return this.#config.safearea;
  }

  set sensor(value) {
    if (value) {
      this.setAttribute('sensor', value);
    } else {
      this.removeAttribute('sensor');
    }
  }

  get sensor() {
    return this.#config.sensor;
  }

  set calltoaction(value) {
    if (value) {
      const newValue = {
        ...(typeof value === 'string' ? JSON.parse(value) : value)
      };
      this.setAttribute('calltoaction', JSON.stringify(newValue));
    } else {
      this.removeAttribute('calltoaction');
    }
  }

  get calltoaction() {
    return this.#config.calltoaction;
  }

  _fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }

  _getInfo() {
    const { width, height, x, y } = this.#nodes.main.getBoundingClientRect();
    return { width, height, x, y };
  }

  _updateInfo() {
    this.#data = {
      ...this.#data,
      ...this._getInfo()
    };
  }

  _setInitialData(extra = {}) {
    const initialData = {
      ...this._getInfo(),
      ...extra,
      mtime: Math.floor(new Date().getTime() / 1000) // unit: seconds
    };

    if (isLSReady) {
      window.localStorage.setItem(LSKey, JSON.stringify(initialData));
    }
  }

  _render() {
    const now = Math.floor(new Date().getTime() / 1000);
    const { align } = this.#config;
    let initialData = {
      width: inlineSize,
      height: blockSize,
      closetime: 0
    };

    // localStorage
    if (isLSReady) {
      try {
        initialData = {
          ...initialData,
          ...JSON.parse(window.localStorage.getItem(LSKey))
        };
      } catch(err) {
        console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
      }
    }

    // suicide once time distance under cooltime
    if (initialData.closetime && now - initialData.closetime < this.cooltime) {
      this.remove();
      return;
    }

    if (align) {
      this.align(align);
    } else {
      this.align(initialData);
    }
  }

  _correct() {
    const { width, height, x, y } = this._getInfo();
    const { width:vW, height:vH } = _wcl.getViewportSize();
    const { minSize } = this.#data;
    const limitLeft = this.safearea;
    const limitRight = vW - this.safearea;
    const limitTop = Math.max(this.safearea, borderSize * indicatorTimes);
    const limitBottom = vH - this.safearea;
    const info = { width, height, x, y };

    // width
    if (info.width > (vW - this.safearea * 2)) {
      info.width = vW - this.safearea * 2;
    }

    if (info.width < minSize) {
      info.width = minSize;
    }

    // height 
    if (info.height > (vH - limitTop - this.safearea)) {
      info.height = vH - limitTop - this.safearea;
    }

    if (info.height < minSize) {
      info.height = height;
    }

    if (x < limitLeft) {
      info.x = limitLeft;
    } else if (x + info.width > limitRight) {
      info.x = vW - info.width - this.safearea;
    }

    if (y < limitTop) {
      info.y = limitTop;
    } else if (y + info.height > limitBottom) {
      info.y = vH - info.height - this.safearea;
    }

    this._refresh(info);
  }

  _refresh({ x, y, width, height }) {
    const { styleSheet } = this.#nodes;

    _wcl.addStylesheetRules('.main--manuver', {
      '--inset-inline-start': `${x}px`,
      '--inset-block-start': `${y}px`,
      '--inline-size': `${width}px`,
      '--block-size': `${height}px`,
    }, styleSheet);

    this._setInitialData();
  }

  _onDown(evt) {
    this.#data.ddController = new AbortController();

    const { main } = this.#nodes; 
    const target = evt.target.closest('em');
    const html = document.querySelector('html');
    const signal = this.#data.ddController .signal;
    const { x:pX, y:pY } = _wcl.pointer(evt);

    if ((typeof evt.buttons !== 'undefined' && evt.buttons !== 1) || main.dataset.action) {
      return;
    }

    evt.preventDefault();
    main.dataset.action = target.dataset.action;
    this.dataset.action = target.dataset.action;

    // evts
    html.addEventListener(evtMove, this._onMove, { signal });
    html.addEventListener(evtUp, this._onUp, { signal });

    // state
    main.classList.add('main--dragging');
    this._updateInfo();
    this.#data.dX = pX - _wcl.scrollX - this.#data.x;
    this.#data.dY = pY - _wcl.scrollY - this.#data.y;
  }

  _onMove(evt) {
    const { main } = this.#nodes; 
    const { x:pX, y:pY } = _wcl.pointer(evt);
    const { width:vW, height:vH } = _wcl.getViewportSize();
    const { x, y, dX, dY, width, height, minSize } = this.#data;

    const limitLeft = this.safearea;
    const limitRight = vW - this.safearea;
    const limitTop = Math.max(this.safearea, borderSize * indicatorTimes);
    const limitBottom = vH - this.safearea;
    let info;

    if ((typeof evt.buttons !== 'undefined' && evt.buttons !== 1) || !main.dataset.action) {
      return;
    }

    switch (main.dataset.action) {
      case 'drag': {
        let sX = pX - _wcl.scrollX - dX; //selection X
        let sY = pY - _wcl.scrollY - dY; //selection Y

        if (sX < limitLeft) {
          sX = limitLeft;
        } else if (sX + width > limitRight) {
          sX = vW - width - this.safearea;
        }

        if (sY < limitTop) {
          sY = limitTop;
        } else if (sY + height > limitBottom) {
          sY = vH - height - this.safearea;
        }

        info = { x:sX, y:sY, width, height }
        this._fireEvent(custumEvents.drag, info);
        break;
      }

      case 'resizeRB': {
        const sX = x;
        const sY = y;
        const deltaX = width - dX;
        const deltaY = height - dY;

        let sW = (pX - _wcl.scrollX) + deltaX - sX; // selection width
        let sH = (pY - _wcl.scrollY) + deltaY - sY; // selection height

        if (sW < minSize) {
          sW = minSize;
        } else if (sX + sW > limitRight) {
          sW = vW - sX - this.safearea;
        }

        if (sH < minSize) {
          sH = minSize;
        } else if (sY + sH > limitBottom) {
          sH = vH - sY - this.safearea;
        }

        info = { x:sX, y:sY, width:sW, height:sH, type:'right-bottom' };
        this._fireEvent(custumEvents.resize, info);
        break;
      }

      case 'resizeRT': {
        const sX = x;
        const deltaX = width - dX;
        const lY = y + height; // limit Y

        let sW = (pX - _wcl.scrollX) + deltaX - sX; // selection width
        let sH = lY - (pY - dY - _wcl.scrollY);

        if (sW < minSize) {
          sW = minSize;
        } else if (sX + sW > limitRight) {
          sW = vW - sX - this.safearea;
        }
        
        if (sH < minSize) {
          sH = minSize;
        } else if (lY - sH < limitTop) {
          sH = lY - limitTop;
        }

        const sY = lY - sH;

        info = { x:sX, y:sY, width:sW, height:sH, type:'right-top' };
        this._fireEvent(custumEvents.resize, info);
        break;
      }

      case 'resizeLT': {
        const lY = y + height; // limit Y
        const lX = x + width; // limit X

        let sW = lX - (pX - _wcl.scrollX - dX); // selection width
        let sH = lY - (pY - dY - _wcl.scrollY);

        if (sW < minSize) {
          sW = minSize;
        } else if (lX - sW < limitLeft) {
          sW = lX - limitLeft;
        }

        if (sH < minSize) {
          sH = minSize;
        } else if (lY - sH < limitTop) {
          sH = lY - limitTop;
        }

        const sX = lX - sW;
        const sY = lY - sH;

        info = { x:sX, y:sY, width:sW, height:sH, type:'left-top' };
        this._fireEvent(custumEvents.resize, info);
        break;
      }

      case 'resizeLB': {
        const lX = x + width; // limit X
        const sY = y;
        const deltaY = height - dY;

        let sW = lX - (pX - _wcl.scrollX - dX); // selection width
        let sH = pY - _wcl.scrollY + deltaY - sY; // selection height

        if (sW < minSize) {
          sW = minSize;
        } else if (lX - sW < limitLeft) {
          sW = lX - limitLeft;
        }

        if (sH < minSize) {
          sH = minSize;
        } else if (sY + sH > limitBottom) {
          sH = vH - sY - this.safearea;
        }

        const sX = lX - sW;

        info = { x:sX, y:sY, width:sW, height:sH, type:'left-bottom' };
        this._fireEvent(custumEvents.resize, info);
      }
    }

    this._refresh(info);
  }

  _onUp(evt) {
    const { main } = this.#nodes;

    if ((typeof evt.buttons !== 'undefined' && (evt.buttons & 1)) || !main.dataset.action) {
      return;
    }

    this.#data.ddController.abort();
    main.classList.remove('main--dragging');

    delete main.dataset.action;
    delete this.dataset.action;
  }

  _onClose(evt) {
    const { main } = this.#nodes;
    const signal = this.#data.controller.signal;
    const animation = main.animate(
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(0)', opacity: 0 }
      ],
      {
        fill: 'forwards',
        easing: 'cubic-bezier(.68,-.55,.265,1.55)',
        duration: 650
      }
    );

    evt.preventDefault();

    animation.addEventListener('finish',
      () => {
        this.remove();
      }
    , { signal });

    this._fireEvent(custumEvents.close);
    this._setInitialData({ closetime: Math.floor(new Date().getTime() / 1000) }); // unit: seconds
  }

  _onResize(evt) {
    this._correct();
  }

  _onCTAClick(evt) {
    const detail = {
      baseEvent: evt // original click event
    };

    this._fireEvent(custumEvents.click, detail);
  }

  align(initialData) {
    const { width:vW, height:vH } = _wcl.getViewportSize();
    const {
      width = inlineSize,
      height = blockSize,
      corner:argCorner = '',
    } = initialData;
    let nX, nY;
    const corner = ['top-left', 'top-right', 'bottom-right', 'bottom-left'].includes(argCorner) ? argCorner : 'bottom-right';

    if (typeof initialData.x !== 'undefined' && typeof initialData.y !== 'undefined') {
      nX = initialData.x;
      nY = initialData.y;
    } else {
      switch (corner) {
        case 'top-left':
          nX = this.safearea;
          nY = this.safearea;
          break;
        case 'top-right':
          nX = vW - width - this.safearea;
          nY = this.safearea;
          break;
        case 'bottom-right':
          nX = vW - width - this.safearea;
          nY = vH - height - this.safearea;
          break;
        case 'bottom-left':
          nX = this.safearea;
          nY = vH - height - this.safearea;
          break;
      }
    }

    this._refresh({ width, height, x:nX, y:nY });
    this._correct();
  }

  close() {
    const { btnClose } = this.#nodes;
    btnClose.click();
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('MscPortableVideo');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(T, MscPortableVideo);
}