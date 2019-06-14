class WebShare extends HTMLElement {
  static get is() {
    /**
     * @customElement web-share
     */
    return 'web-share';
  }

  get supported() {
    return this._supported;
  }

  set supported(value) {
    /**
     * @event supported-changed
     */
    this._supported = value;
    this.dispatchEvent(new CustomEvent('supported-changed', {
      detail: {
        value
      }
    }));
  }

  get header() {
    return this._header;
  }

  set header(value) {
    /**
     * @event header-changed
     */
    this._header = value;
    this.dispatchEvent(new CustomEvent('header-changed', {
      detail: {
        value
      }
    }));
  }

  get text() {
    return this._text;
  }

  set text(value) {
    /**
     * @event text-changed
     */
    this._text = value;
    this.dispatchEvent(new CustomEvent('text-changed', {
      detail: {
        value
      }
    }));
  }

  get url() {
    return this._url;
  }

  set url(value) {
    /**
     * @event url-changed
     */
    this._url = value;
    this.dispatchEvent(new CustomEvent('url-changed', {
      detail: {
        value
      }
    }));
  }

  /**
   * @method share
   */
  share() {
    if (this.supported) {
      navigator.share({
        title: this.header,
        text: this.text,
        url: this.url,
      })
      .then(() => {
        /**
         * @event web-share-success
         */
        this.dispatchEvent(new CustomEvent('web-share-success', {
          bubbles: true,
          composed: true
        }));
      })
      .catch((error) => {
        /**
         * @event web-share-error
         */
        this.dispatchEvent(new CustomEvent('web-share-error', {
          detail: {
            message: {
              error
            }
          },
          bubbles: true,
          composed: true
        }));
      });
    }
  }

  constructor() {
    super();
    /**
     * @property supported
     * @type {?boolean}
     */
    this.supported;

    /**
     * @property header
     * @type {?string}
     */
    this.header;

    /**
     * @property text
     * @type {?string}
     */
    this.text;

    /**
     * @property url
     * @type {?string}
     */
    this.url;
  }

  connectedCallback() {
    // Set `supported` value in `connectedCallback()` instead of `constructor()` for compatibility with Polymer data binding
    this.supported = 'share' in navigator;
  }
}

customElements.define(WebShare.is, WebShare);
