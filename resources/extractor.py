import sys

from bs4 import BeautifulSoup
import json
import re

filenames = {'ngc_10h.txt',
             'ngc_10k.txt',
             'ngc_1k.txt',
             'ngc_20h.txt',
             'ngc_20k.txt',
             'ngc_25h.txt',
             'ngc_2h.txt',
             'ngc_50h.txt',
             'ngc_5h.txt',
             'ngc_5k.txt',
             }

pattern = re.compile(r'ms\s+19[2-3][0-9]')

def parse(filename):
    flname = 'htmlData/' + filename
    toParse = ''
    with open(flname, 'r') as res:
        toParse = res.read()
    # Parse the HTML using BeautifulSoup
    soup = BeautifulSoup(toParse, 'html.parser')

    # Find the table in the HTML
    table = soup.find_all('tr', class_=pattern)
    content = table[-5:]
    # Extract data from the table
    pattern1 = re.compile(r'^base|^star\s+grade-\d+')
    data = []

    for row in content:  # Skip the header row
        cur_line = [row.get('class')[1]]
        columns = row.find_all('td', class_=pattern1)
        for td in columns:
            if not td.get_text(strip=True):  # Check if the <td> is empty
                cur_line.append('0')
            else:
                cur_line.append(td.get_text(strip=True))
        data.append(cur_line)

    # Convert the 2D array to a dictionary
    data_dict = {row[0]: row[1:] for row in data}

    # Convert the dictionary to JSON format
    json_data = json.dumps(data_dict, indent=2)

    newFileName = 'censuses/' + filename[:-4] + '.json'
    # Write JSON data to a file
    with open(newFileName, 'w') as json_file:
        json_file.write(json_data)
    print(f"created a new file: {newFileName}")

if __name__ == "__main__":
    for value in filenames:
        parse(value)
