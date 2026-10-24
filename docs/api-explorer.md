# API explorer

An interactive view of the [OpenAPI](https://spec.openapis.org/oas/v3.0.3) description of the API that the dashboard expects. Expand an endpoint to see its parameters, request body and example responses.

**On this page**

- [About this view](#about-this-view)
- [Explorer](#explorer)

## About this view

- The description is the same contract as the [API reference](api-reference.md), in a standard machine-readable format. You can [download `openapi.yaml`](openapi.yaml) and open it in any OpenAPI tool.
- It describes what the front end sends and reads. It was not generated from a running server.
- This view is for reading only. The **Try it out** feature is turned off because no public server is available.

## Explorer

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.17.14/swagger-ui.css">
<div id="swagger-ui"></div>
<script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.17.14/swagger-ui-bundle.js"></script>
<script>
  window.addEventListener("load", function () {
    window.ui = SwaggerUIBundle({
      url: "../openapi.yaml",
      dom_id: "#swagger-ui",
      deepLinking: false,
      docExpansion: "list",
      supportedSubmitMethods: []
    });
  });
</script>
