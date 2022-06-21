document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#model-warning").style.display = "none";
  document.querySelector("#regulation-warning").style.display = "none";

  document.querySelector("#results").style.display = "none";

  document.querySelector("#connect-checked").style.display = "none";

  document.querySelector("#database").addEventListener("change", function () {
    document.querySelector("#upload-file button").innerText = "Connect";
    document.querySelector("#rdf-input").placeholder = "Database URL";
  });

  document
    .querySelector("#upload-step")
    .addEventListener("change", function () {
      document.querySelector("#upload-file button").innerText = "Upload";
      document.querySelector("#rdf-input").placeholder =
        "Upload IFC in STEP Format";
    });

  document.querySelector("#upload-rdf").addEventListener("change", function () {
    document.querySelector("#upload-file button").innerText = "Upload";
    document.querySelector("#rdf-input").placeholder =
      "Upload IFC in RDF Format";
  });

  // Back Button
  document
    .querySelector(".back-button button")
    .addEventListener("click", function () {
      document.querySelector("#upload-file").style.display = "block";
      document.querySelector("#select-criteria").style.display = "block";
      document.querySelector("#results").style.display = "none";

      getAllItems = document.querySelectorAll(".result-list");

      for (i = 0; i < getAllItems.length; i++) {
        getAllItems[i].parentNode.removeChild(getAllItems[i]);
      }
    });
});

createTable = true;
function changeToDatabase() {}
function changeToSTEP() {}
function changeToRDF() {}

function getURL() {
  inputValue = document.querySelector("#rdf-input").value;

  if (inputValue.length > 0)
    document.querySelector("#connect-checked").style.display = "block";
}

function encodeString(query) {
  query = query.replace(/ /g, "%20");

  query = query.replace(/{/g, "%7B");
  query = query.replace(/}/g, "%7D");

  query = query.replace(/</g, "%3C");
  query = query.replace(/>/g, "%3E");

  query = query.replace(/#/g, "%23");

  while (query.includes("(")) query = query.replace("(", "%28");

  while (query.includes(")")) query = query.replace(")", "%29");

  query = query.replace(/,/g, "%2C");

  query = query.replace(/"/g, "%22");

  return query;
}

function doCheck() {
  regulationDocument = document.querySelector("#criteria-input").selectedIndex;
  databaseUrl = document.querySelector("#rdf-input").value;

  if (databaseUrl.length == 0) {
    document.querySelector("#model-warning").style.display = "flex";
  } else if (regulationDocument == 0) {
    document.querySelector("#regulation-warning").style.display = "flex";
  } else {
    // Display result view
    document.querySelector("#upload-file").style.display = "none";
    document.querySelector("#select-criteria").style.display = "none";

    document.querySelector("#results").style.display = "block";

    // Get data

    // If model is uploaded in STEP format
    if (document.querySelector(".file-options #upload-step").checked) {
      // Do this
    }
    // If model is uploaded in RDF format
    else if (document.querySelector(".file-options #upload-rdf").checked) {
      // Do this
    }
    // If link to database is provided
    else if (document.querySelector(".file-options #database").checked) {
      ttlUrl = document.querySelector("#rdf-input").value;

      // Send SPARQL queries (Two sample queries)

      // Sample query #1

      query = `select * where {?door a <https://pi.pauwel.be/voc/buildingelement#Door>;<http://lbd.arch.rwth-aachen.de/props#forceRequiredToOpenDoorAtLeadingEdge_simple> ?openingForce Bind(IF(?openingForce <= 20, "PASS","FAIL") As ?results)}`;

      // encode string

      query = encodeString(query);

      urlApi = ttlUrl + "?query=" + query;

      fetch(urlApi)
        .then((response) => response.text())
        .then((results) => {
          resultLines = results.split("\n");

          createTable = true;
          for (i = 1; i < resultLines.length - 1; i++) {
            doorID = resultLines[i].split(",")[0].split("#")[1];
            doorID = doorID.trim();

            openingForceValue = resultLines[i].split(",")[1];
            openingForceValue = parseFloat(openingForceValue);

            doorStatus = resultLines[i].split(",")[2];
            doorStatus = doorStatus.trim();

            expectedValue = "Less than or equal to 20N";

            recommendation = "";
            if (doorStatus == "FAIL")
              recommendation = "Change power operated door opening system";

            results = [
              doorID,
              openingForceValue,
              doorStatus,
              expectedValue,
              recommendation,
            ];

            // Display door opening force check result

            tableId = "door-width";
            displayOpeningForceResults(createTable, results, tableId);
            createTable = false;
          }
          table = new DataTable(document.querySelector("#" + tableId), {
            // options
            paging: false,
            info: false,
          });
        });
    }
  }

  // Sample query #2: Minimum door effective width

  query = `select ?door ?clearWidth ?results where { ?building a <https://w3id.org/bot#Building>;<http://lbd.arch.rwth-aachen.de/props#isNew_simple> ?buldingDesign. filter ( ?buldingDesign = <https://w3id.org/express#TRUE>) ?building <https://w3id.org/bot#hasStorey> ?story. ?story <https://w3id.org/bot#hasSpace> ?space. ?space <https://w3id.org/bot#containsElement> ?door. ?door <http://lbd.arch.rwth-aachen.de/props#widthOfDoorAccessRoute_simple> ?value.filter (?value >1.5) ?door <http://lbd.arch.rwth-aachen.de/props#clearWidth_simple> ?clearWidth Bind(IF(?clearWidth >= 0.8, "PASS","FAIL") As ?results)} `;

  // encode string

  query = encodeString(query);

  urlApi = ttlUrl + "?query=" + query;

  fetch(urlApi)
    .then((response) => response.text())
    .then((results) => {
      resultLines = results.split("\n");

      createTable = true;
      for (i = 1; i < resultLines.length - 1; i++) {
        doorID = resultLines[i].split(",")[0].split("#")[1];
        doorID = doorID.trim();

        widthValue = resultLines[i].split(",")[1];
        widthValue = parseFloat(widthValue) * 1000;

        doorStatus = resultLines[i].split(",")[2];
        doorStatus = doorStatus.trim();

        expectedValue = "Greater than or equal to 800mm";

        recommendation = "";
        if (doorStatus == "FAIL")
          recommendation = "Increase width of door to 900mm";

        results = [
          doorID,
          widthValue,
          doorStatus,
          expectedValue,
          recommendation,
        ];

        // Display door opening force check result

        tableId = "door-min-width";

        displayMinWidthResults(createTable, results, tableId);
        createTable = false;
      }

      table = new DataTable(document.querySelector("#" + tableId), {
        // options
        paging: false,
        info: false,
      });
    });
}

function displayOpeningForceResults(createTable, results, tableId) {
  // Get values
  doorID = results[0];
  openingForceValue = results[1];
  doorStatus = results[2];
  expectedValue = results[3];
  recommendation = results[4];

  doorStatusClass = "positive";
  if (doorStatus == "FAIL") doorStatusClass = "negative";

  if (createTable) {
    //Create the table and add the values
    element = document.createElement("div");
    element.className = "result-list";
    element.innerHTML = `

<div class="result-header">Door opening force</div>
<table id="${tableId}" class="display">
    <thead>
        <tr>
            <th>Door ID</th>
            <th>Check Result</th>
            <th>Expected Value</th>
            <th>Actual Value</th>
            <th>Recommendation</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${doorID} </td>
            <td class = "${doorStatusClass}">${doorStatus}</td>
            <td>${expectedValue}</td>
            <td>${openingForceValue}</td>
            <td>${recommendation}</td>
        </tr>
    </tbody>
</table>
`;

    resultContainer = document.querySelector("#results");
    resultContainer.appendChild(element);
  } else {
    // Add the values to the existing table

    document.querySelector("#" + tableId + " tbody").innerHTML += `<tr>
            <td>${doorID} </td>
            <td class = "${doorStatusClass}">${doorStatus}</td>
            <td>${expectedValue}</td>
            <td>${openingForceValue}</td>
            <td>${recommendation}</td>
        </tr>
`;
  }
}

function displayMinWidthResults(createTable, results, tableId) {
  // Get values
  doorID = results[0];
  doorWidthValue = results[1];
  doorStatus = results[2];
  expectedValue = results[3];
  recommendation = results[4];

  doorStatusClass = "positive";
  if (doorStatus == "FAIL") doorStatusClass = "negative";

  if (createTable) {
    element = document.createElement("div");
    element.className = "result-list";
    element.innerHTML = `

<div class="result-header">Minimum effective clear widths of doors</div>
<table id="${tableId}" class="display">
    <thead>
        <tr>
            <th>Door ID</th>
            <th>Check Result</th>
            <th>Expected Value</th>
            <th>Actual Value</th>
            <th>Recommendation</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${doorID} </td>
            <td class = "${doorStatusClass}">${doorStatus}</td>
            <td>${expectedValue}</td>
            <td>${doorWidthValue}</td>
            <td>${recommendation}</td>
        </tr>
    </tbody>
</table>
`;

    resultContainer = document.querySelector("#results");
    resultContainer.appendChild(element);
  } else {
    // Add the values to the existing table

    document.querySelector("#" + tableId + " tbody").innerHTML += `<tr>
            <td>${doorID} </td>
            <td class = "${doorStatusClass}">${doorStatus}</td>
            <td>${expectedValue}</td>
            <td>${doorWidthValue}</td>
            <td>${recommendation}</td>
        </tr>
`;
  }
}
