import requests
import time

urls = {
    'ngc_20k': 'https://www.ngccoin.com/census/world/czechoslovakia-czech-slovak-rep.-bohemia-and-moravia/sc-92/20k/',
    'ngc_10k': 'https://www.ngccoin.com/census/world/czechoslovakia-czech-slovak-rep.-bohemia-and-moravia/sc-92/10k/',
    'ngc_5k': 'https://www.ngccoin.com/census/world/czechoslovakia-czech-slovak-rep.-bohemia-and-moravia/sc-92/5k/',
    'ngc_1k': 'https://www.ngccoin.com/census/world/czechoslovakia-czech-slovak-rep.-bohemia-and-moravia/sc-92/koruna/',
    'ngc_50h': 'https://www.ngccoin.com/census/world/czechoslovakia-czech-slovak-rep.-bohemia-and-moravia/sc-92/50h/',
    'ngc_25h': 'https://www.ngccoin.com/census/world/czechoslovakia-czech-slovak-rep.-bohemia-and-moravia/sc-92/25h/',
    'ngc_20h': 'https://www.ngccoin.com/census/world/czechoslovakia-czech-slovak-rep.-bohemia-and-moravia/sc-92/20h/',
    'ngc_10h': 'https://www.ngccoin.com/census/world/czechoslovakia-czech-slovak-rep.-bohemia-and-moravia/sc-92/10h/',
    'ngc_5h': 'https://www.ngccoin.com/census/world/czechoslovakia-czech-slovak-rep.-bohemia-and-moravia/sc-92/5h/',
    'ngc_2h': 'https://www.ngccoin.com/census/world/czechoslovakia-czech-slovak-rep.-bohemia-and-moravia/sc-92/2h/'}

def getData(filename, url):
    # create request
    x = requests.get(url)
    # convert request to string datatype
    text = x.text
    fln = 'htmlData/' + filename + '.txt'
    with open(fln, 'w') as newfile:
        newfile.write(text)
    print("created a new file: {fln}")

if __name__ == "__main__":
    for key, value in urls.items():
        getData(key, value)
        time.sleep(1)
