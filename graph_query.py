import rdflib
import pyshacl

from rdflib.namespace import NamespaceManager
from rdflib import Graph, RDF, URIRef, Literal

from pyshacl import validate

graph = Graph()
graph.parse('duplex.ttl', format='ttl')

shapes = Graph()
shapes.parse('shapes.ttl', format='ttl')


# dictionary for storing the datapoint ids (Building Management System)
P = {'spaces_ids':[]}

# dictionary for storing the output 
R = {}
#input

# Query the graph to get the 3D vectors for lights and spaces
qres = g.query("""
    PREFIX owl: <http://www.w3.org/2002/07/owl#> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
    PREFIX bot: <https://w3id.org/bot#> 
    PREFIX brick: <https://brickschema.org/schema/Brick#> 
    PREFIX om: <http://openmetrics.eu/openmetrics#> 
    SELECT DISTINCT ?sp ?sp_guid WHERE {
        ?sp a bot:space . 
        ?sp bot:hasguid ?sp_id .
        }""")

# Store results of the query in a dictionary
for r in qres:
	P["lights"].append({str(r.li.toPython()):r.bbli.toPython()})

for r in qres:
    P["spaces"].append({str(r.sp.toPython()):r.bbsp.toPython()})
