# %% Run the frontend

from tkinter import *
from tkinter.ttk import *
from tkinter.filedialog import askopenfile 
import time

ws = Tk()
ws.title('Ontology-based Compliance Checker')
ws.geometry('300x100') 


def open_file():
    file_path = askopenfile(mode='r', filetypes=[('graph', '*ttl')])
    if file_path is not None:
        pass


def uploadFiles():
    pb1 = Progressbar(ws, orient=HORIZONTAL, length=300, mode='determinate')
    pb1.grid(row=4, columnspan=3, pady=20)
    for i in range(5):
        ws.update_idletasks()
        pb1['value'] += 20
        time.sleep(1)
    pb1.destroy()
    Label(ws, text='File Uploaded Successfully!', foreground='green').grid(row=4, columnspan=3, pady=10)
        
    
    
adhar = Label(ws, text='Upload Building Data in ttl format')
adhar.grid(row=1, column=1, padx=10)

adharbtn = Button(ws, text ='Choose File', command = lambda:open_file()) 
adharbtn.grid(row=1, column=2)

upld = Button(ws, text='Upload Files', command=uploadFiles)
upld.grid(row=3, columnspan=3, pady=10)

ws.mainloop()


# %% Get the imported file
