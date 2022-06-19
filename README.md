# Challenge 5: Ontology-based Compliance Checking
**Champions**: Nick Nisbet, Jeroen Werbrouck, Pieter Pauwels

**Number of people per team**: 3-4
**Anticipated workload**: about 20-25 hours per person, which includes time for preparation of the presentation.

## Remote participation:
If you need to participate remotely to this challenge, you can do so via [this link](https://ugent-be.zoom.us/j/6762372999?pwd=NXFFUnIrSVFLbFliUmJyVDlYOWNwZz09
)

## Challenge description: 
Automated compliance checking is the “capstone” challenge for automation in the construction sector because it requires applicants to offer building models of sufficient quality to answer external scrutiny of both prescriptive and performance normative regulations. Since there is a difference of language between the normative domain and the applicant domain, there is often an intermediate dictionary/thesaurus. 
There is little agreement on the form that these three bodies of knowledge should take, and it is unlikely that all three will be in a common form. In this challenge they will be delivered in STEP, XML and HTML.
This problem can be solved by using linked data approaches that will support data homogenization through identifying relationships embedded in the ingested data and then creating associations between data representing the regulation, the dictionary and the real world building. The  building will be provided in three versions..

Within the coding challenge you will work on the following tasks:
* Examine the three existing datasets and convert into ontologies to define a suitable set of links for the datasets. There is commonality in the three datasets, as each may contain applicability, selection and exceptions defining the subject matter. But take care to respect the different nature of the predicates – normative requirements, definitive synonyms, and descriptive properties and characteristics.
* Develop the evaluations that can simulate manual decision making, reporting if each version of the building passes (true), fails (false) or is undecidable (unknown) when compared or tested against a regulation.


## Challenger Research Questions:
* Can you define a suitable set of links within and between the datasets? There is no need to merge or compare the three versions of the building.
* Can you deduce new facts and can these lead to a decision? The challenge is to get the right result for each of the three versions of the building.
* Optionally, could linked data represent uncertainty in the real values in the building and in the deductions?

## Data Sets available: 
* Normative facts:  A regulation clause in a structured form. Maybe KIF, maybe IFCxml constraints. 
* Definitive facts. A dictionary as XML. 
* Descriptive facts: Three trivial tiny BIM models, named Project-P, Project-Q and Project-R

## Auxiliary web resources:
* Watch the first two movies: http://www.aec3.eu/require1/AEC3_Require1.html
* Browse the first two lessons: http://www.aec3.eu/require1/Help_en-GB/index.html

## Challenge Instructions
Bring your laptop.

## Tools
* IFC2x3 to ifcOWL converter
* XML to rdf/owl converter
* HTML to rdf/owl converter


## References
1. Nisbet N, Wix J and Conover D. 2008. "The future of virtual construction and regulation checking”, in Brandon, P., Kocaturk, T. (Eds),Virtual Futures for Design, Construction and Procurement, Blackwell, Oxfordshire. doi: 10.1002/9781444302349.ch17
2. Eilif Hjelseth, Nick Nisbet (2010) “Overview of Concepts for Model Checking” in CIB W78 2010 27th International Conference - Applications of IT in the AEC Industry.
3. Eilif Hjelseth, Nick Nisbet (2010) “Exploring Semantic Based Model Checking” in CIB W78 2010 27th International Conference - Applications of IT in the AEC Industry.
4. Eilif Hjelseth, Nick Nisbet (2011) “Capturing normative constraints by use of the semantic mark-up (RASE) methodology” in CIB W78 2011 28th International Conference - Applications of IT in the AEC Industry. 
