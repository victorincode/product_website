
export class ProductPage {
    #databaseLink = "https://dummyjson.com/products/";
    #productData = {};
    #productContainer;
    constructor(product) {
        this.#productData = product;
        console.log(product);
        this.#init();
        this.#productContainer = document.querySelector("article");

    }
    // Get the page ready for loading by clearing out the previous page
    // and making proper preparations.
    #init = () => {
        const article = document.querySelector("article");
        article.remove();
        const productContainer = document.createElement("article");
        productContainer.className = "product-container";
        const main = document.querySelector("main");
        main.append(productContainer);

    }
    run = () => {
        this.#populateContent();

    }
   
    #populateContent = () => {
        this.#loadItemInformation();
        this.#loadAllThumbnails();
        const body = document.querySelector("body");
        body.scrollTo(0,0);

    }
    #loadAllThumbnails = () => {
        const thumbnailContainer = document.createElement("section");
        this.#productContainer.append(thumbnailContainer);
        thumbnailContainer.className = "view-thumbnails";
        const ulElement = document.createElement("ul");
        thumbnailContainer.appendChild(ulElement);
        for (let imageId in this.#productData.images) {
            const photo = this.#createThumbnailPhoto(imageId);
            ulElement.appendChild(photo);
        }
    }
    #createThumbnailPhoto(id) {
        const liElement = document.createElement("li");
        const productImage = document.createElement("img");
        productImage.src = this.#productData.images[id];
        productImage.alt = `Product image of ${this.#productData.title}`;
        liElement.appendChild(productImage);
        return liElement;
    }

    #loadItemInformation = () => {
        const itemInformationContainer = document.createElement("section");
        this.#productContainer.append(itemInformationContainer);
        itemInformationContainer.className = "item-information-container";
        const itemTitle = document.createElement("h3");
        itemTitle.innerText = `${this.#productData.title}`;
        itemInformationContainer.appendChild(itemTitle);
        
        const itemDescription = document.createElement("p");
        itemDescription.innerHTML = `${this.#productData.description}`;
        itemInformationContainer.appendChild(itemDescription);
    
        const itemPrice = document.createElement("h2");
        const initialPrice = this.#productData.price;
        const discount = (initialPrice * this.#productData.discountPercentage);
        const currentPrice = Math.ceil(initialPrice - (discount/100));
        itemPrice.innerHTML = `
            <s>$${initialPrice}</s> $${currentPrice}
        `;
        itemInformationContainer.appendChild(itemPrice);
    }

}

