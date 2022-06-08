# %% Import packages

import ifcopenshell
import json

from rdflib.namespace import NamespaceManager
from rdflib import Graph, RDF, URIRef, Literal

#%% Create a namespace
NS_om = "http://openmetrics.eu/openmetrics#"
NS_bot = "https://w3id.org/bot#"
NS_rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
NS_owl = "http://www.w3.org/2002/07/owl#"
NS_schema = "http://schema.org#"
NS_beo = "https://w3id.org/beo#"


#%% Import IFC file
f = ifcopenshell.open('duplex.ifc')

buildings = f.by_type("IfcBuilding")
stories = f.by_type("IfcBuildingStorey")
spaces = f.by_type("IfcSpace")

# %%
