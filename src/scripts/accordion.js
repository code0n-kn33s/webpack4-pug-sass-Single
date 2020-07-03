{/* <div class="card-group-custom card-group-corporate" id="constructorAccordion" role="tablist"
aria-multiselectable="false">
<article class="card card-custom card-corporate">
  <div class="card-header" id="constructorAccordionHeading1" role="tab">
    <div class="card-title">
      <a class="collapsed" role="button" data-toggle="collapse" data-parent="#constructorAccordion"
        href="#constructorAccordionCollapse1" aria-controls="constructorAccordionCollapse1"
        aria-expanded="true">
        Какие документы необходимы для оформления?
        <div id="plus-minus-toggle1" class="plus-minus-toggle collapsed"></div>
      </a>
    </div>
  </div>
  <div class="collapse-item" id="constructorAccordionCollapse1" role="tabpanel"
    aria-labelledby="constructorAccordionHeading1">
    <div class="card-body">
      <p>
        Паспорт иностранного гражданина
      </p>
    </div>
  </div>
</article> */}

const parrent = document.getElementById("constructorAccordion");

parrent.addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.hasAttribute("aria-controls")) {
        const target = e.target.getAttribute("aria-controls");
        const icon = e.target.querySelector(".plus-minus-toggle");

        icon.classList.toggle("collapsed");
        document.getElementById(target).classList.toggle("active");
    }
});