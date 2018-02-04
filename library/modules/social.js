class Social {
    constructor() {
        this.timer = 10000; // In Milliseconds
        this.elements = null;
        this.position = -1;
    }

    SetElements(elements) {
        this.elements = elements;
        this.position = -1;
    }

    Start() {
        if (this.elements.children.length > 0) {
            setInterval(() => this._next(), this.timer);
        }
    }

    _next() {
        // Remove the current Element
        this._hideSocial()

        // Next position
        this.position++;

        if (this.position === this.elements.children.length) {
            this.position = -1;
        }

        this._showSocial();
        
    }

    _showSocial() {
        if(this.position != -1) {
            this.elements.children[this.position].classList.add("display");
        }
    }

    _hideSocial() {
        if(this.position != -1) {
            this.elements.children[this.position].classList.remove("display");
        }
    }
    
}

module.exports = new Social();