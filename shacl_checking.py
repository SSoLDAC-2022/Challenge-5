# %% Import packages
import rdflib
import pyshacl
from pyshacl import validate
from rdflib import Graph

#%% Parse the data graph and the shapes graph
graph = Graph()
graph.parse('Data_Graph.ttl', format='ttl')

shapes = Graph()
shapes.parse('Shapes.ttl', format='ttl')


#%% Validate and Print Results
# HERE WE CHECK WHETHER THE RELATIONSHIP SYSTEM-ZONE CONFORMS WITH A REUSABLE STRUCTURE

import pyshacl

results = pyshacl.validate(
    data_graph=graph,
    shacl_graph=shapes,
    data_graph_format="ttl",
    shacl_graph_format="ttl",
    inference="rdfs",
    debug=True,
    serialize_report_graph="ttl",
    )

conforms, report_graph, report_text = results

print("conforms", conforms)
print(report_text)

# %%

report_g = Graph()
report_g.parse(data=report_graph, format="ttl", encoding="utf-8")
nm = report_g.namespace_manager

for s, p, o in sorted(report_g):
    print(s.n3(nm), p.n3(nm), o.n3(nm))

report_g.serialize(destination="Validation_Report.ttl", format="turtle")


####################################################################
####################################################################
######     Query the SHACL graph to get the errors    ##############
####################################################################
####################################################################


g = Graph()
g.parse("Data_Graph.ttl")


# dictionary for storing the datapoint ids (Building Management System)
P = {'instances':[]}

# dictionary for storing the output 
R = {}
#input

# %% Query the graph to get the 3D vectors for lights and spaces
qres = g.query("""
PREFIX props: <https://w3id.org/props#> 
PREFIX sh: <http://www.w3.org/ns/shacl#> 
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> 

SELECT DISTINCT ?node WHERE {
    ?bn1 sh:result ?bn2 .
    ?bn2 sh:focusNode  ?node. 
    }
""")


# %% Store results of the query in a dictionary
for r in qres:
	P["lights"].append({str(r.li.toPython()):r.bbli.toPython()})

for r in qres:
    P["spaces"].append({str(r.sp.toPython()):r.bbsp.toPython()})

# %% Make the comparison

for i in range(0,len(P["lights"])):    
    for j in P["lights"][i]:
        #print(P["lights"][i][str(j)])
        json.loads(P["lights"][i][str(j)])["bbox"]

    
R = json.loads(P["bb_lights"][0]["inst_bbli"])

# %% Store results into dictionary
for row in qres:
    res_bbli = json.loads(f"{row.bbli}")
    res_bbsp = json.loads(f"{row.bbsp}")
    res_sp = json.loads(f"{row.sp}")
    res_li = json.loads(f"{row.li}")

'''