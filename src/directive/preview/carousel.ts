type CarouselElement = {
  root: Element
  scroller: Element | null
  snaps: NodeListOf<Element>
  previous: Element | null
  next: Element | null
}

export class Carousel {
  private elements: CarouselElement
  private current?: Element
  private intersection_observer?: IntersectionObserver

  constructor(element: Element) {
    this.elements = {
      root: element,
      scroller: element.querySelector('.carousel-scroller'),
      snaps: element.querySelectorAll('.carousel-snap'),
      previous: element.querySelector('.previous'),
      next: element.querySelector('.next')
    }

    this.createObservers()
    this.listen()
  }

  goPrevious() {
    const previous = this.current?.previousElementSibling
    if (this.current === previous) return
    if (previous) {
      this.goElement({
        scrollport: this.elements.scroller,
        element: previous
      })
      this.current = previous
      if (!previous.previousElementSibling) {
        this.elements.previous?.classList.add('no-previous')
      } else {
        this.elements.next?.classList.remove('no-next')
      }
    } else {
      console.log('at the beginning')
    }
  }

  goNext() {
    const next = this.current?.nextElementSibling
    if (this.current === next) return
    if (next) {
      this.goElement({
        scrollport: this.elements.scroller,
        element: next
      })
      this.current = next
      if (!next.nextElementSibling) {
        this.elements.next?.classList.add('no-next')
      } else {
        this.elements.previous?.classList.remove('no-previous')
      }
    } else {
      console.log('at the end')
    }
  }

  goElement({ scrollport, element }) {
    const delta = Math.abs(scrollport.offsetLeft - element.offsetLeft)
    const scrollerPadding = parseInt(getComputedStyle(scrollport)['paddingLeft'])
    const position = scrollport.clientWidth / 2 > delta ? delta - scrollerPadding : delta + scrollerPadding
    scrollport.scrollTo({ left: position })
  }

  createObservers() {
    this.intersection_observer = new IntersectionObserver(
      entries => {
        for (const entrie of entries) {
          entrie.target.classList.toggle('in-active', entrie.isIntersecting)
          if (entrie.isIntersecting) {
            this.current = entrie.target
          }
        }
      },
      {
        root: this.elements.root,
        threshold: 0.55
      }
    )
  }

  listen() {
    for (const element of this.elements.snaps) {
      this.intersection_observer?.observe(element)
    }

    this.elements.previous?.addEventListener('click', this.goPrevious.bind(this))
    this.elements.next?.addEventListener('click', this.goNext.bind(this))
  }
}
