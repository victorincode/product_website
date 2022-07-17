
export class ProductPage {
    #databaseLink = "https://dummyjson.com/products/";
    #productData = {};
    #productId;
    #productContainer;
    constructor(productId) {
        this.#productContainer = document.querySelector("article");
        this.#productId = productId;
        console.log("id was set to:", this.#productId);
    }
    run = async () => {
        await this.#loadApiData();
        this.#populateContent();

    }
    #loadApiData = async () => {
        let retrievedData = await fetch(this.#databaseLink)
            .then(response => response.json());
        // We only want to keep the products.
        retrievedData = retrievedData['products'];
        this.#productData = retrievedData[this.#productId];
    }

    #populateContent = () => {
        this.#loadItemInformation();
        this.#loadAllThumbnails();
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
        liElement.appendChild(productImage);
        return liElement;
    }

    #loadItemInformation = () => {
        const itemInformationContainer = document.createElement("section");
        this.#productContainer.append(itemInformationContainer);
        itemInformationContainer.className = "item-information-container";
        const itemTitle = document.createElement("h2");
        itemTitle.innerText = `${this.#productData.title}`;
        itemInformationContainer.appendChild(itemTitle);

        const itemPrice = document.createElement("h2");
        const initialPrice = this.#productData.price;
        const discount = (initialPrice * this.#productData.discountPercentage);
        const currentPrice = Math.ceil(initialPrice - (discount/100));
        itemPrice.innerHTML = `
            <s>$${initialPrice}</s> $${currentPrice}
        `;
        itemInformationContainer.appendChild(itemPrice);

        const itemDescription = document.createElement("p");
        itemDescription.innerHTML = `${this.#productData.description}`;
        itemInformationContainer.appendChild(itemDescription);
    }

}

