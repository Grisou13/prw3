# Data extraction

# Tax calculation

To get the data used to calculate your taxes you will need [tabula](htt://tabula.technology).
Tabula will help extract data from pdfs as tables. This is important, since almost all official documents are pdfs.

Then you will need to get the federal tax calculation pdf and extract the data by hand. This is done in 2 steps, first extracting the first column (tax for single people), then extracting taxes for married people.

To do so just select the zones like the following screenshot :

This will produce 2 csvs. The first should be fine, but the second one needs hand processing.

If you open up the married tax csv, you will notice that tabula couldn't reconsile the lines correctly. You will need to do it by hand.
Weach means that you will need to match the 77'000 to the amount in % the person payes.

The easiest way to do so is opening the file in excel (or equivalent) and copy paste the columns.

# Tax spendings

The data for tax spedings is completly extracted by hand. It is extracted from this pdf
https://www.vd.ch/fileadmin/user_upload/themes/etat_droit/finances_publiques/fichiers_pdf/Brochure_Comptes_2016.pdf
@page 284.

Get the `Charges` column and put the data in a json in the following format :
```
{
    '<departement name>':
    {
        'total':'<extracted value>'
    },
    ....
}
```

You can also exxtract details of this if you want . It will just require more time.

Here's an example:
```
{
    '<departement name>':
    {
        'Salaires des enseignants':'<extracted value>',
        'Travailleurs temporaires':'<extraced value>',
        ....
    },
}
```

The app behind will automatically calculate totals. You may specify as many levels of details as you want.