// Runtime smoke tests for the retail application

export function runRuntimeTests(): { success: boolean; message: string } {
  function assert(condition: boolean, message: string) {
    if (!condition) throw new Error(message);
  }

  try {
    // Basic checks
    assert(
      typeof URLSearchParams !== "undefined",
      "URLSearchParams should be available"
    );

    // URLSearchParams usage test
    const params = new URLSearchParams();
    params.set("zone_id", "HOT");
    params.set("sort", "score");
    assert(
      params.toString().includes("zone_id=HOT"),
      "params should include zone_id"
    );

    // Shelf grid element check
    const shelf = document.querySelector(".shelf-grid");
    assert(!!shelf, "shelf-grid element must exist");

    console.log("RetailFrontPreview · Tests OK");
    return { success: true, message: "Tests OK" };
  } catch (err) {
    const message =
      "Tests FAILED: " + (err instanceof Error ? err.message : String(err));
    console.error("RetailFrontPreview · Tests FAILED", err);
    return { success: false, message };
  }
}
