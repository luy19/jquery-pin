import $ from 'jquery';

export interface JQueryPinOption {
  minWidth?: number;
  activeClass?: string;
  containerSelector?: string;
  padding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

export type JQueryPinPlugin = (
  this: JQuery,
  options?: JQueryPinOption,
) => JQuery;

declare global {
  interface JQuery {
    pin: JQueryPinPlugin;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const pin: JQueryPinPlugin = function pin(options = {}) {
  const $window = $(window);
  let elements: JQuery[] = [];
  let scrollY = 0;
  let disabled = false;

  const recalculateLimits = function recalculateLimits() {
    const windowWidth = $window.width() || 0;
    elements.forEach(($this) => {
      if (options.minWidth && windowWidth <= options.minWidth) {
        if ($this.parent().is('.pin-wrapper')) {
          $this.unwrap();
        }
        $this.css({
          width: '',
          left: '',
          top: '',
          position: '',
        });
        if (options.activeClass) {
          $this.removeClass(options.activeClass);
        }
        disabled = true;
        return;
      }
      disabled = false;

      const $container = options.containerSelector
        ? $this.closest(options.containerSelector)
        : $(document.body);
      const DEFAULT_COORDINATES = { left: 0, top: 0 };
      const offset = $this.offset() || DEFAULT_COORDINATES;
      const containerOffset = $container.offset() || DEFAULT_COORDINATES;
      const parentOffset = $this.offsetParent().offset() || DEFAULT_COORDINATES;

      if (!$this.parent().is('.pin-wrapper')) {
        $this.wrap('<div class="pin-wrapper">');
      }

      const pad = $.extend(
        {
          top: 0,
          bottom: 0,
        },
        options.padding || {},
      );
      const containerHeight = $container.height() || 0;
      const thisOuterHeight = $this.outerHeight() || 0;
      const thisOuterWidth = $this.outerWidth() || 0;

      $this.data('pin', {
        pad,
        from:
          (options.containerSelector ? containerOffset.top : offset.top)
          - pad.top,
        to:
          containerOffset.top + containerHeight - thisOuterHeight - pad.bottom,
        end: containerOffset.top + containerHeight,
        parentTop: parentOffset.top,
      });

      $this.css({ width: thisOuterWidth });
      $this.parent().css('height', thisOuterHeight);
    });
  };

  const onScroll = function onScroll() {
    if (disabled) {
      return;
    }

    scrollY = $window.scrollTop() || 0;

    elements = elements
      .filter((elm) => {
        const $this = $(elm);
        const data = $this.data('pin');
        return !!data;
      })
      .map((elm) => {
        const $this = $(elm);
        const data = $this.data('pin');
        const from = data.from - data.pad.bottom;
        const to = data.to - data.pad.top;

        if (from + ($this.outerHeight() || 0) > data.end) {
          $this.css('position', '');
          return $this;
        }

        if (from < scrollY && to > scrollY) {
          if ($this.css('position') !== 'fixed') {
            $this
              .css({
                left: $this.offset()?.left || 0,
                top: data.pad.top,
              })
              .css('position', 'fixed');
          }
          if (options.activeClass) {
            $this.addClass(options.activeClass);
          }
        } else if (scrollY >= to) {
          $this
            .css({
              left: '',
              top: to - data.parentTop + data.pad.top,
            })
            .css('position', 'absolute');
          if (options.activeClass) {
            $this.addClass(options.activeClass);
          }
        } else {
          $this.css({ position: '', top: '', left: '' });
          if (options.activeClass) {
            $this.removeClass(options.activeClass);
          }
        }

        return $this;
      });
  };

  const update = function update() {
    recalculateLimits();
    onScroll();
  };

  this.each(function each() {
    const $this = $(this);
    const data = $(this).data('pin') || {};

    if (data && data.update) {
      return;
    }
    elements.push($this);
    $('img', this).one('load', recalculateLimits);
    data.update = update;
    $(this).data('pin', data);
  });

  $window.on('scroll', onScroll);
  $window.on('resize', recalculateLimits);
  recalculateLimits();

  $window.on('load', update);

  return this;
};

$.fn.pin = pin;
