#%% Import packages
import ifcopenshell
import json
from rdflib.namespace import NamespaceManager
from rdflib import Graph, RDF, URIRef, Literal, RDF

#%% Create a namespace
NS_om = "http://openmetrics.eu/openmetrics#"
NS_beo = "https://pi.pauwel.be/voc/buildingelement#"
NS_rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
NS_rdfs = "http://www.w3.org/2000/01/rdf-schema#"
NS_owl = "http://www.w3.org/2002/07/owl#"
NS_schema = "http://schema.org#"
NS_mat = "http://bimerr.iot.linkeddata.es/def/material-properties#"
NS_props = "https://w3id.org/props#"

#%% Import IFC file

f = ifcopenshell.open("Atlas_8_floor.ifc")
#f = ifcopenshell.open("101.ifc")

walls = f.by_type("IfcWall")


#%% 
graph = Graph()
graph.namespace_manager.bind("om", URIRef(NS_om))
graph.namespace_manager.bind("props", URIRef(NS_props))
graph.namespace_manager.bind("mat", URIRef(NS_mat))
graph.namespace_manager.bind("rdf", URIRef(NS_rdf))
graph.namespace_manager.bind("owl", URIRef(NS_owl))
graph.namespace_manager.bind("schema", URIRef(NS_schema))
graph.namespace_manager.bind("beo", URIRef(NS_beo))


#%% Converter 
for wall in walls: 
        inst_wall = URIRef(NS_om + "inst_wall_" + wall.GlobalId.replace("$","_")[16:])
        beo_wall = URIRef(NS_beo + "wall")
        graph.add((inst_wall, RDF.type, beo_wall))
        try:
                material_layers = wall.HasAssociations[0].RelatingMaterial.ForLayerSet.MaterialLayers
                for m_l in material_layers:
                        # relationship wall hasmateriallayer
                        inst_material_layer = URIRef(NS_om + "inst_material_layer_" + wall.GlobalId.replace("$","_")[16:])
                        hasMaterialLayer = URIRef(NS_mat + "hasMaterialLayer")
                        mat_material_layer = URIRef(NS_mat + "MaterialLayer")
                        graph.add((inst_material_layer, RDF.type, mat_material_layer))
                        graph.add((inst_wall, hasMaterialLayer, inst_material_layer))
                        #relations material_layer props:thickness, props:name
                        props_layerName = URIRef(NS_props + "hasName")
                        props_layerThickness = URIRef(NS_props + "hasThickness")
                        props_layerDensity = URIRef(NS_props + "hasDensity")
                        graph.add((inst_material_layer, props_layerThickness, Literal(str(m_l.LayerThickness))))                       
                        graph.add((inst_material_layer, props_layerName, Literal(str(m_l.Name))))
                        # relation --> materialLayer mat:hasMaterial mat:material
                        hasMaterial = URIRef(NS_mat + "hasMaterial")                        
                        inst_material = URIRef(NS_om + "inst_material_" + wall.GlobalId.replace("$","_")[16:])
                        mat_material = URIRef(NS_mat + "Material")
                        graph.add((inst_material, RDF.type, mat_material))
                        graph.add((inst_material_layer, hasMaterial, inst_material))
                        # relation --> material props:hasDensity "float"
                        props_hasDensity = URIRef(NS_props + "hasDensity")
                        graph.add((inst_material, props_hasDensity, Literal(str(m_l.Material.Density))))
        except:
                pass 

#%% Export the graph
graph.serialize(destination="Data_Graph.ttl", format="turtle")


# %%