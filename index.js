//? This array is not to be changed.
const salesTax = [
    {state: 'Alabama', tax: .04},
    {state: 'Alaska', tax: .00},
    {state: 'Arizona', tax: .056},
    {state: 'Arkansas', tax: .065},
    {state: 'California', tax: .0725},
    {state: 'Colorado', tax: .029},
    {state: 'Connecticut', tax: .0635},
    {state: 'Delaware', tax: .00},
    {state: 'DC', tax: .06},
    {state: 'Florida', tax: .06},
    {state: 'Georgia', tax: .04},
    {state: 'Hawaii', tax: .04166},
    {state: 'Idaho', tax: .06},
    {state: 'Illinois', tax: .0625},
    {state: 'Indiana', tax: .07},
    {state: 'Iowa', tax: .06},
    {state: 'Kansas', tax: .065},
    {state: 'Kentucky', tax: .06},
    {state: 'Louisiana', tax: .0445},
    {state: 'Maine', tax: .055},
    {state: 'Maryland', tax: .06},
    {state: 'Massachusetts', tax: .0625},
    {state: 'Michigan', tax: .06},
    {state: 'Minnesota', tax: .06875},
    {state: 'Mississippi', tax: .07},
    {state: 'Missouri', tax: .04225},
    {state: 'Montana', tax: .00},
    {state: 'Nebraska', tax: .055},
    {state: 'Nevada', tax: .0685},
    {state: 'New Hampshire', tax: .00},
    {state: 'New Jersey', tax: .06625},
    {state: 'New Mexico', tax: .05125},
    {state: 'New York', tax: .04},
    {state: 'North Carolina', tax: .0475},
    {state: 'North Dakota', tax: .05},
    {state: 'Ohio', tax: .0575},
    {state: 'Oklahoma', tax: .045},
    {state: 'Oregon', tax: .00},
    {state: 'Pennsylvania', tax: .06},
    {state: 'Rhode Island', tax: .07},
    {state: 'South Carolina', tax: .06},
    {state: 'South Dakota', tax: .06},
    {state: 'Tennessee', tax: .07},
    {state: 'Texas', tax: .0625},
    {state: 'Utah', tax: .061},
    {state: 'Vermont', tax: .06},
    {state: 'Virginia', tax: .053},
    {state: 'Washington', tax: .065},
    {state: 'West Virginia', tax: .06},
    {state: 'Wisconsin', tax: .05},
    {state: 'Wyoming', tax: .04},
];

//! Classes
//Items are used by stores, so it would be a good idea to have items defined up top.
class item {
    //Creation function with Quantity created.
    static createItem(UPC, Name, buyPrice,  markUp, quantity = 1)
    {
        let decimalifiedPrice = buyPrice * 0.01;
        let sellPrice = buyPrice += (buyPrice * markUp)
        let decimalifiedsellPrice = sellPrice / 100;
        return new item(UPC, Name, decimalifiedPrice, quantity, decimalifiedsellPrice.toFixed(2))
    }
    // !WHEN TYPING IN THE BUY PRICE PLEASE TYPE THE NUMBER IN CENTS!
    constructor(UPC, Name, buyPrice, quantity, sellPrice,)
    {
        this.UPC = UPC;
        this.Name = Name;
        this.buyPrice = buyPrice;
        this.quantity = quantity;
        this.sellPrice = sellPrice;
    }
}

//Stores are defined here.
class Store {
    static openStore(Name, location, balance)
    {
        let found = salesTax.find((states) => states.state == location)
        return new Store(Name, location, found.tax, balance, 0,0)
    }
    constructor(Name, location,  salesTax, balance, profit, expenses)
    {
        this.Name = Name;
        this.location = location;
        this.salesTax = salesTax;
        this.balance = balance; //NOTATE THIS IN CENTS!!!!
        this.profit = profit;
        this.expenses = expenses ;
        //inventory is always initialized as a blank array.
        this.inventory = [];
    }


    buyItem(newItem)
    {
        if (newItem.buyPrice * newItem.quantity > this.balance)
        {
            console.log("There isn't enough money in the budget to purchase this item!")
            return;
        }
        else
        {
            let duped = false; //Determines if an item in the inventory already matches this item's UPC!
            let totalCosts = newItem.quantity * newItem.buyPrice;
            for (let items of this.inventory)
            {
                if (items.UPC == newItem.UPC)
                {
                    duped = true; //Since this item matches, we switch duped to true.
                    
                    //We message the console about the fact that this item overlaps with another item and add the quantity to the pre-existing item.
                    console.log("DUPLICATED ITEM DETECTED: " +newItem.quantity+" will be added to UPC "+newItem.UPC+"!")
                    console.log(totalCosts + " has been deducted from the total balance and added to the expenses.")
                    items.quantity += newItem.quantity;
                    
                    //Run numbers, subtract balance and add expenses.
                    this.balance -= totalCosts;
                    this.expenses += totalCosts;

                    //Rounding!!!!
                    //this.balance = this.balance.toFixed(2)
                    //this.expenses = this.expenses.toFixed(2)
                }
            }
            if (!duped) //If we go through the loop without tripping Duped, we are able to add the item to the array.
            {
                //We message that the item's price has been deducted.
                console.log((totalCosts + " has been deducted from the total balance and added to the expenses."))
                
                //We deduct from the balance and add to the expenses.
                this.balance -= totalCosts;
                this.expenses += totalCosts;

                //ROUNDING!!!!
                //this.balance = this.balance.toFixed(2)
                //this.expenses = this.expenses.toFixed(2)

                //We push the item into the inventory array!
                this.inventory.push(newItem);
            }
        
        }
    }


    sellItem(UPC, quantity)
    {
        for (let items of this.inventory)
        {
            if (UPC == items.UPC) //Checks to see if this item matches with an item in an inventory.
            {
                if(quantity <= items.quantity) //Checks to see if there is enough
                {
                    //Remove item quantity and subtract items from the inventory.
                    let totalNet = items.sellPrice * quantity;
                    items.quantity -= quantity;
                    
                    //Run numbers, add balance, and add profit.
                    this.balance += totalNet;
                    this.profit += totalNet; 

                    //Rounding!!!!
                    //this.balance = this.balance.toFixed(2);
                    //this.profit = this.profit.toFixed(2);

                    return;
                }
                else //Error Log for not enough item.
                {
                    console.log("NOT ENOUGH ITEMS IN INVENTORY!!")
                    return;
                }
            }
        }
        //If no items are flagged, this message automatically logs.
        console.log("NO CORRESPONDING ITEM TO SELL!")
    }

    applyTaxes(number, buying)
    {
        let taxedNumber = 0;
        //Adds the sales tax to a number if buying, use this for purchases and for calculating expenses.
        if(buying)
        {
            taxedNumber = number + (number * salesTax)
            return(taxedNumber)
        }
        //Subtracts the sales tax to a number if selling, use this for selling items and for calculating profits.
        else
        {
            taxedNumber = number + (number * salesTax)
            return(taxedNumber)
        }
    }
}

//! CREATE STORES
// Generate 3 different stores, each in a different state.
let Vermontopia = Store.openStore("Vermontopia", 'Vermont', 100);
let Dcopolis = Store.openStore("Dcopolis", "DC", 150)
let Texania = Store.openStore("Texania", "Texas", 200)
//! Inventory
//Testing UPC functions!
let fork = item.createItem(1, "fork set", 299,  0.3) //TESTING THE CREATION OF ITEMS WITHOUT A QUANTITY CONSTRUCTOR.
let knife = item.createItem(1, "knife set", 499, 0.3, 2) //Testing the UPC system, the item should update the quantity of the corresponding UPC without creating a new inventory slot.
let spoon = item.createItem(1, "spoon set", 599, 0.3, 3) //The quantities of these items with the same UPC should add up to SIX!!!!!
let cuttingBoard = item.createItem(2, "CuttingBoard", 499, 0.3)
let tongs = item.createItem(3, "Tongs", 399, 0.3);
let thePinkPanther = item.createItem(99, "THE PINK PANTHER DIAMOND", 999999, 2.0) //CREATING AN ABSURDLY EXPENSIVE ITEM WITH THE INTENTION OF ATTEMPTING TO BUY IT!


let apple = item.createItem(20, "Apples", 199, 0.5,10)
let apple2 = item.createItem(20, "Apples2", 199, 0.5,11)
let orange = item.createItem(21, "Orange", 180, 0.5)
let banana = item.createItem(22, "Bananas", 170, 0.5)

let shirt = item.createItem(10, "T-Shirt", 1099, 0.2)
let slacks = item.createItem(11, "Slacks", 1499, 0.3)
let shoes = item.createItem(12, "Shoes", 3099, 0.3)
//! Stocking

//* First Store
Vermontopia.buyItem(fork)
Vermontopia.buyItem(knife)
Vermontopia.buyItem(spoon)
Vermontopia.buyItem(cuttingBoard)
Vermontopia.buyItem(tongs)

//* Second Store
Texania.buyItem(apple);
Texania.buyItem(apple2);
Texania.buyItem(orange);
Texania.buyItem(banana);

//* Third Store
Dcopolis.buyItem(shirt);
Dcopolis.buyItem(slacks);
Dcopolis.buyItem(shoes);

//! Selling

//* First Store
Vermontopia.sellItem(1, 5);
Vermontopia.sellItem(1, 2); //Testing the reduction of quantity, and attempting to sell items that are not present.

Texania.sellItem(22,1);

Dcopolis.sellItem(10,1);
Dcopolis.sellItem(1,1) //Attempting to sell an item the store does not have!

//* Second Store

//* Third Store

//! Testing
console.log(Vermontopia);
console.log(Dcopolis);
console.log(Texania);
/* 
    Simply console log each store to check the completed details.
*/