import {ProductPage} from "./product/productPage.js"
class MainPage {
    #productData = {};
    #databaseLink = "https://dummyjson.com/products";
    #currentCategory = "";
    #sectionClassName = "product-by-category";
    #categoryClassName = "category-title";
    #categoryNames = [];
    run = async () => {
        await this.#loadApiData();
        this.category = "smartphones";
        this.#populateContent();
    }
    // only allow a category to be changed to a valid entry in the database
    set category(newCategory) {
        if (this.#productData[newCategory]) this.#currentCategory = newCategory;
    }
    get category() {
        return this.#currentCategory;
    }
    #loadApiData = async () => {
        let retrievedData = await fetch(this.#databaseLink)
            .then(response => response.json());
        // We only want to keep the products.
        retrievedData = retrievedData['products'];
        // Group the data by category!
        const categorizedData = [];
        for (let data in retrievedData) {
            const category = `${retrievedData[data].category}`;
            if (!categorizedData[category]) {
                categorizedData[category] = [];
                this.#categoryNames.push(category);
            }
            categorizedData[category].push(retrievedData[data]);
        }
        this.#productData = categorizedData;
    }

    #populateContent() {
        const article = document.querySelector("article");
        for(let category of this.#categoryNames){
            const section = document.createElement("section");
            section.className = this.#sectionClassName;
            section.id = category;
            const categoryTitle = document.createElement("div");
            categoryTitle.className = this.#categoryClassName;
            categoryTitle.innerText = category;
            const ulElement = document.createElement("ul");
            ulElement.addEventListener("click", event =>{
                if(event.target.nodeName !== "IMG") return;
                // Change this later to have proper ids for all images.
                const productPage = new ProductPage(this.#productData[category][event.target.id]);
                productPage.run();
            });
            section.append(categoryTitle);
            section.append(ulElement);
            article.appendChild(section);
            let count = 0;
            for(let item of this.#productData[category]){
                const product = document.createElement("li");
                const itemName = document.createElement("h3");
                itemName.textContent = item.title;
                const productImage = document.createElement("img");
                productImage.src = item.thumbnail;
                productImage.alt = `Product image of ${category}`;
                productImage.id = count;
                // productImage.id = `${category}-${count}`;
                product.appendChild(productImage);
                product.appendChild(itemName);
                ulElement.appendChild(product);
                article.append(section);
                count++;
            }
        }

    }


}

const myApp = new MainPage();
myApp.run();
