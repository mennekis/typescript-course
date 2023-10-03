const plainNumbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
];

const decimals = [
  "twenty",
  "thirty",
  "fourty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

plainNumbers[18] = "eighteen";

function numberToString(n: number): string {
  if (n in plainNumbers) {
    return plainNumbers[n];
  }

  if (n > 15 && n < 20) {
    return plainNumbers[n - 10] + "teen";
  }

  return "not implemented";
}

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

class Products {
  constructor(public list: ProductData[]) {}

  // 1. Write method that returns array of first 3 products images as string array (images property)
  getImages(n: number = 10) {
    let result = this.list
      .slice(0, n)
      .map((elem) => elem.images)
      .flat();

    return result;
  }

  // 2. Write method that returns array of products titles sorted by price from min to max
  getListTitlePriceSortMinMax() {
    let result = [...this.list]
      .sort((a, b) => (a.price > b.price ? 1 : -1))
      .map((element) => element.title);

    return result;
  }

  // 3. Write method that searches product by title. If product not found - return undefined. Also supprt search by part of title.
  searchProduct(search: string): ProductData | undefined {
    return this.list.find((product) => {
      if (product.title.toLowerCase().includes(search.toLowerCase())) {
        return product;
      }
    });
  }

  // 4. Write method that returns products with rating 4.9 and more
  getProductsWithRating(minRating: number) {
    return this.list.filter((arr) => arr.rating >= minRating);
  }

  // 5. Write method that returns total price of products with discountPercentage 10 and more
  getTotalPriceWithDiscount(minDiscountPercentage: number) {
    let result = this.list
      .filter((arr) => arr.discountPercentage >= minDiscountPercentage)
      .reduce((acc, item) => acc + item.price, 0);

    return result;
  }

  // 6. Write method that finds product with max discountPercentage and returns it title and brand
  getMaxDiscount() {
    let maxDiscount = 0;
    let result;

    this.list.forEach((product) => {
      if (maxDiscount < product.discountPercentage) {
        maxDiscount = product.discountPercentage;
        result = `${product.title} - ${product.brand}`;
      }
    });

    return result;
  }

  // 7. Write method that finds cheapest smartphone and returns it brand name (category prop is "smartphones", brand prop is brand name)
  getCheepestPhone() {
    const firstProduct = this.list[0];
    let minPrice: number = firstProduct.price;
    let result: string = firstProduct.brand;

    this.list.forEach((item) => {
      if (item.category === "smartphones") {
        if (item.price < minPrice) {
          minPrice = item.price;
          result = item.brand;
        }
      }
    });

    return result;
  }

  // 8. Write method that counts products for each brand
  countBrandProduct() {
    let result: {
      [key: string]: number;
    } = {};

    this.list.forEach((product) => {
      if (result[product.brand]) {
        result[product.brand] += 1;
      } else {
        result[product.brand] = 1;
      }
    });

    return result;
  }

  // 9. Write method that returns top 3 brands with most products
  getTopBrand() {
    let obj = this.countBrandProduct();

    let result = Object.keys(obj)
      .sort((a, b) => (obj[a] > obj[b] ? -1 : 1))
      .splice(0, 3);

    return result;
  }

  // 10. Write method that groups products by brand - { Apple: [... list of products], Golden: [...list of products], } - where key - brand name, value - array of products
  getGroupedProductsByBrandTitle() {
    let result: {
      [key: string]: ProductData[];
    } = {};

    this.list.forEach((product) => {
      if (result[product.brand]) {
        result[product.brand].push(product);
      } else {
        result[product.brand] = [product];
      }
    });

    return result;
  }
}
