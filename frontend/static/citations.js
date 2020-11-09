const citations = [
  'Pracujte pouze s lidmi, které byste si pozvali na oběd do ',
  'Jaké štěstí mít chuť k jídlu, máme-li naději na dobrý oběd v ',
  'Člověk si nemůže dovolit býti jiným před obědem a jiným po obědě v ',
  'Králi neapolský, jděte se podívat, je-li už prostřeno k obědu v',
  'Dobrý oběd probouzí vše, co je v muži něžnějšího - ',
  'Domácí obědy jsou levné, nepočítáme-li náklady na manželství, takže raději do ',
  'Často jsem slyšel lidi tvrdit, že něco takového jako bezplatný oběd není možné tady v ',
  'Ženy mají rády muže poddajné, kteří jsou vážení v bance a nechodí nikdy pozdě k obědu do ',
  'O cizím neštěstí až po obědě v',
  'Pít rum před obědem z vás dělá piráta, ne alkoholika - ',
  'Kdo se spoléhá na cizí stůl, bývá často bez oběda v',
  'Neptejte se, co můžete udělat pro svou zemi. Zeptejte se, co je k obědu v',
  'Hladoví nechtějí vládnout, nýbrž jíst v',
  'Život nemá jiný smysl, než ukojit hlad, tělesný a duševní v',
  'S láskou je tomu jako s jídlem - když má člověk velké oči, pustí se do toho, ale dlouho nevydrží -',
  'Zřídka pozorujeme vážnější tváře než při čtení jídelních lístků v',
  'Kdo je sytý, nepochopí, co si hladový vytrpí v',
  'Chtěl bych se smát s moudrými a jíst s bohatými v'
]

// Calculate random citation
const getCitation = () => {
  return citations[Math.floor(Math.random() * citations.length)];
}

export { getCitation }