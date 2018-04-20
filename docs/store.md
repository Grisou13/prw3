# Representation of the store
```
{
    form: { //taken from input form, this is submitted to the store only when 3 out of the 5 inputs are filled up
        fields: {
            fortune: "",
            income: "",
            deductions: "",
            nb_children: "",
            married: false
        },
        errors: [],
        valid: true
    },
    calculation:{ //fetched from server
        fortune:{
            0:0,
            40000: 0.014 (1.4%), //fortuneMinima : tax percent taken
            .....
        },
        income:{
            0:0,
            40000: 0.014 (1.4%),
            .....
        },
        nb_children:{
            0:0,
            1:-700,
            2:-1400,
            3:-2100
        },
        federalTaxMarried:{
            40000: 100 //amount in chf the person pays for the scale he is in
        },
        federalTaxSignle:{
            40000: 100 //amount in chf the person pays for the scale he is in
        }
        
    },
    spending:{ //fetched from server
        education:{
            total: int, // normally tax data should include all the sub categories of spending for a given district, but for now since we don't have a way of autmating that, we just get the total which will give us a final computed value for total of the total, which is dumb
            ....
        },
        envirronement:{
            total:int, //same here
            ....
        },
        health:{
            total: 
        },
        sports: {
            total:int,
            ....
        },
        hr:{
            total:int
        },
        court:{
            total: int,
            ....
        },
        secretariat:{
            total:int,
            ....
        }
    }
}
```

