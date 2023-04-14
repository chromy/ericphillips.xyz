class ElementHandler {
  constructor(path) {
    this.path = path;
  }

  element(element) {
    element.prepend(`<base href="//${this.path}">`, {
      html: true,
    });
  }

  comments(comment) {
  }

  text(text) {
  }
}

async function handleRequest(request) {
  const buildId = await TRAFFIC.get("build");
  const path = `ericphillips.xyz/builds/${buildId}/`;
  const page = await fetch(`https://${path}`);
  const rewriter = new HTMLRewriter().on("head", new ElementHandler(path));
  const response = rewriter.transform(page);
  response.headers.append("X-Clacks-Overhead", "GNU Eric Phillips");
  response.headers.append("X-Clacks-Overhead", "GNU Pamela Phillips");
  return response;
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
});
