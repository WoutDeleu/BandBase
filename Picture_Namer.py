import os
# os.rename(r'file path\OLD file name.file type', r'file path\NEW file name.file type')

def del_char(string, indexes):
    return ''.join((char for idx, char in enumerate(string) if idx not in indexes))

def printIntro():
    print("Dit script hernoemt alle pictures naar de juiste naamformaat")
    print()
    print()

def naarJuisteVorm(pad):
    locatie = del_char(pad, [0])
    locatie = del_char(locatie, [len(locatie) - 1])
    return locatie



printIntro()

print("Plak de adres van de locatie (vorm: tussen dubbele aanhalingstukken)(Als pad kopieren)")
locatie = naarJuisteVorm(input())


counter = 1
for fileName in os.listdir(locatie):                    #Overloopt hij ze in numerieke volgorde?
    #print(fileName)
    nr = str(counter)

    oldFilePath = locatie + "\\" + fileName
    # print (filePath)
    oldFileName = fileName

    newFileName = "image" + nr + ".jpg"
    newFilePath = locatie + "\\" + newFileName

    print(newFilePath)
    print(oldFilePath)
    print()
    os.rename(oldFilePath, newFilePath)
    counter += 1

print()
print("DONE")
