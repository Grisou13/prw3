import csv
import json
def tidyIntegers(lines):
    tidy = lambda x: float(x.replace("'","")) if '.' in x else int(x.replace("'",""))
    return { tidy(x[0]) : tidy(x[1]) for x in lines }

def toPercent(lines):
    return { k : (x/k) for k, x in lines.items() }
def main():
    data = {}
    with open("federal_tax_married_processed.csv","r+") as f:
        reader = csv.reader(f, delimiter=';')
        newRows = tidyIntegers(reader)
        newRows["0"] = 0
        data["federalTaxMarried"] = newRows
    with open("federal_tax_alone_processed.csv","r+") as f:
        reader = csv.reader(f, delimiter=',')
        newRows = tidyIntegers(reader)
        newRows["0"] = 0
        data["federalTaxSingleAsF"] = newRows
    with open("income_barem.csv","r+") as f:
        reader = csv.reader(f, delimiter=';')
        newLines = tidyIntegers([ (x[0],x[2]) for x in reader ])
        # newLines = { tidyInteger(x[0]):tidyIntegers(x[2]) for x in newLines }
        newLines["0"] = 0
        data["fortune"] = newLines

    with open("output.json", "w+") as f:
        json.dump(data,f)

if __name__ == "__main__":
    main()