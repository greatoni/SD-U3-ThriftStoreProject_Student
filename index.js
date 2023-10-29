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
class item {
    addItem(UPC, Name, buyPrice, quantity, markUp)
    {
        return new item(UPC, Name, buyPrice, quantity, (buyPrice += (buyPrice * markUp)))
    }
    addItem(UPC, Name, buyPrice, markUp)
    {
        return new item(UPC, Name, buyPrice, 1, (buyPrice += (buyPrice * markUp)))
    }
    
    constructor(UPC, Name, buyPrice, quantity, sellPrice,)
    {
        this.UPC = UPC;
        this.Name = Name;
        this.buyPrice = buyPrice;
        this.quantity = quantity;
        this.sellPrice = sellPrice;
    }
}

class Store {
    openStore(Name, location, balance)
    {
        //not Implemented
        return new Store(Name, location, notImplemented, balance, 0,0)
    }
    constructor(Name, location,  salesTax, balance, profit, expenses)
    {
        this.Name = Name;
        this.location = location;
        this.salesTax = salesTax;
        this.inventory = inventory;
        this.balance = balance;
        this.profit = profit;
        this.expenses = expenses ;
        this.inventory = [];
    }
    buyItem(newItem, quantity)
    {
        if (newItem.buyPrice * quantity > this.balance)
        {
            return("There isn't enough money in the budget to purchase")
        }
        else
        {
            let duped = false; //Determines if an item in the inventory already matches this item's UPC!
            for (items of this.inventory)
            {
                if (items.UPC == newItem.UPC)
                {
                    duped = true; //Since this item matches, we switch duped to true.
                    //We then update the item and deduct the budget accordingly.
                    items += quantity;
                    this.balance -= newItem.buyPrice * quantity;
                }
            }
            if (!duped) //If we go through the loop without tripping Duped, we are able to add the item to the array.
            {
                
            }
        }
        //Not Implemented;
    }
    sellItem()
    {
        //Not Implemented
    }
}

//! CREATE STORES
// Generate 3 different stores, each in a different state.

//! Inventory


//! Stocking

//* First Store

//* Second Store

//* Third Store

//! Selling

//* First Store

//* Second Store

//* Third Store

//! Testing
/* 
    Simply console log each store to check the completed details.
*/