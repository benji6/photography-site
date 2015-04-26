const createElement = require('virtual-dom/create-element');
const diff = require('virtual-dom/diff');
const h = require('virtual-dom/h');
const patch = require('virtual-dom/patch');
const R = require('ramda');

module.exports = (model, controller) => {
  const createImagesVirtualDiv = (viewName) => {
    return h("div.images", R.map((src) => h("img.thumb", {
      oncontextmenu: () => false,
      onclick: () => window.location.hash = src,
      src
    }), model.getImageSources(viewName)));
  };

  const createVirtualRoot = {
    Symbiosis: () => h("div", [
      h("div.description", [
        h("h2", "Symbiosis"),
        h("p", "This is my latest body of work – an installation piece - which pre-empts the Final Major Project I have created as part of my BA (Hons) Photography degree at Falmouth University:"),
        h("p", "Here lies a collection of deliberately collated individual moments; surreal black and white windows on a world only partially understood by its own inhabitants. Diverse in subject yet unified by aesthetic and process, this body of work is a tribute to the phenomenology of all existing matter. From the rippled silt of a riverbed to the shredded sphincter muscle of an iris, at an atomic level all matter is essentially the same. This notion fascinates me and I believe it is a condition that influences all aspects of life, from the behaviour of the universe and the rhythms of nature, to human interaction and issues surrounding contemporary life."),
        h("p", "Over several months I have captured an array of fragile moments that celebrate the kinetic and intricate nature of life as we know it. Through a cyclical process of shooting, processing, darkroom printing and editing the collection, I finally reduced it to a final set of photographs that I feel collude both the beautiful and the sublime in a clamour of texture, light and form."),
        h("p", "N.B. A short piece of self-written prose is included as part of this installation and can be found in the menu.")
      ]),
      h("section.gallery", createImagesVirtualDiv("Symbiosis"))
    ]),

    Prose_Piece: () => h("div", h("section.prose_piece", h("em", [
      h("h2", "Symbiosis"),
      h("p", "The lapping tongue of a double ended ocean, frothy languid spittle ripples over a coarse bed of sand. Breathing in and out, this boundless body of water obeys the rhythms of a volatile trance; an erratic locomotion that endures whether seen or unseen, heard or unheard. Colossal waves crash against inert rock, effervescent salt water caressing the cracks of this cliff face; a ceaseless pulsating cycle that over thousands of years has etched these deep narrative crags. An uncanny buried scar marks this place, half serpentine half granite, a black jagged line flows south and is lost to the ocean. I am immersed, engulfed by the mesmerising depths of a cool obsidian water, and the world forgets me."),
      h("p", "The elements of this celestial body are quivering and uncertain forms of energy. The dancing flames of a fire that respires, grows and dies; from ashes to ashes they say: everything is cyclic. A body that is all at once fluid, twitching and writhing from darkness into light. Clean cold air fills these lungs and bleary eyes open to the hazy light of day. The origin of all life is a moist mouth, agape and sighing the sundry melodies of a circumvolving world. From light to dark and back again; the hot moist bed of the earth entombs the form. Eyes close and a torrid, dreamless slumber envelopes you."),
      h("p", "A winding bronze river is the spinal cord of this gorge. A synapse in the land snaked with a pulsating body of water whose tidal rise and fall is written in the fluctuation of a lunar form that floats beyond human boundaries of perception. This valley is bathed in a liquid golden sunlight, laced with the heavy pink hue of a dusk that falls sharply… From light into darkness and back again: everything is cyclic. The eyes of this world are unblinking, and its rhythms and cycles shall prevail, with or without me.")
    ]))),

    Darkroom: () => h("div", [
      h("section.description", [
        h("h2", "Darkroom"),
        h("p", "A collection of darkroom prints created over the past five years, all via alternative and experimental methods. The camera is a tool I employ to document the world around me, and it is only within the darkroom that I am then able to unlock the true potential of the latent image. By impressing my own visions and emotions upon each image, and embracing the volatile alchemical nature of the darkroom process, I am able to create dreamlike pieces that lay somewhere between illusion and reality.")
      ]),
      h("section.gallery", createImagesVirtualDiv("Darkroom")),
    ]),

    C41: () => h("div", [
      h("section.description", [
        h("h2", "C41"),
        h("p", "Twelve of my most vivid colour analogue photographs. I am primarily a black and white darkroom based practitioner, but in the summer months I often photograph with C41 as a means of better capturing the kinetic atmosphere and the stunning light.")
      ]),
      h("section.gallery", createImagesVirtualDiv("C41")),
    ]),

    Gesture: () => h("div", [
      h("section.description", [
        h("h2", "Gesture"),
        h("p", "Alongside my conceptual work I am constantly producing a stream of personal work. Always armed with my 35mm SLR, I love to photograph my surroundings and encounters, and this is a collection of some of the most intriguing and fragile moments I have framed with my lens over the past five years. Embracing a monochrome palette and a high contrast aesthetic, I am curating a collection of still fragments from my own life that I hope will continue to expand and flourish alongside my practice; inspiration is everywhere.")
      ]),
      h("section.gallery", createImagesVirtualDiv("Gesture")),
    ]),

    About: () => h("div", [
      h("section.text", [
        h("h2", "About"),
        h("p", "Fine Art Photographer currently enrolled in my final year at Falmouth University studying BA (Hons) Photography. My interest in this medium began at the age of fourteen when I received my first camera, but peaked when I discovered the darkroom and I haven’t looked back since. Over the past five years my practice has developed and matured, especially during my three year Bachelors course, where I have honed my techniques and cultivated my own voice."),
        h("p", "I employ the photographic medium as a means of exploring the realms of science and philosophy. I am interested in the origins of the universe, and the planet we inhabit with all its rhythms and intricacies, questioning where our species belongs in this system and using photography’s stillness to fragment reality and investigate time itself."),
        h("p", "Dedicated to the analogue medium, I print all of my work within the darkroom, often employing experimental and alternative techniques to create unique photographs with depth and aura. Through both my practice and my personal work I am constantly investigating how reality can be captured, preserved and transformed through the lens; my images aim to explore and convey how the intricacies of the human form and psyche can be depicted through the visual language of the photographic medium."),
      ])
    ]),

    Contact: () => h("div", h("div.contact_details", [
      h("h2", "Contact"),
      h("table.contactDetails", [
        h("tr", [
          h("td", "Email: "),
          h("td", h("a", {
            href: "mailto:Teddy@Teddy-Hall.co.uk"
          }, "Teddy@Teddy-Hall.co.uk")),
        ]),
        h("tr", [
          h("td", "Telephone: "),
          h("td", "07904410599"),
        ]),
        h("tr", [
          h("td", "Social Media Links: "),
          h("td", h("a", {
            href: "https://instagram.com/teddy.hall"
          }, "https://instagram.com/teddy.hall")),
        ]),
        h("tr", [
          h("td"),
          h("td", h("a", {
            href: "https://twitter.com/teddyhall_"
          }, "https://twitter.com/teddyhall_")),
        ]),
      ])
    ])),

    Exhibitions: () => h("div", [
      h("section.text", [
        h("h2", "Exhibitions"),
        h("h3", h("u", "Upcoming:")),
        h("p", [
          h("b", "Free Range 2015"),
          " | Falmouth University Graduate Show 18th - 22nd June. I am immensely excited to be exhibiting my Final Major Project as part of the Free Range collective this year at the Old Truman Brewery in Bricklane, London. Opening night is Thursday 18th June from 6pm | The Old Truman Brewery, Brick Lane, London, E1 6QL"
        ]),
        h("h3", h("u", "Past:")),
        h("p", [
          h("b", "Fresh Water Tears"),
          " | ‘The Church of the Red Light’ | Group Exhibition celebrating photography’s alchemic and analogue origins | 4 weeks | 23rd March – 20th April 2015 | The Gallery, Falmouth University, TR10 9FE"
        ]),
        h("p", [
          h("b", "Symbiosis"),
          " | Group Exhibition by selected BA Photography students at Falmouth University | 2 weeks | 9th – 23rd March 2015 | The Gallery, Falmouth University, TR10 9FE"
        ]),
        h("p", [
          h("b", "Carbon Copies"),
          " | 'Coasting' | Group Fine Art and Photography Exhibition | Kemptown, Brighton | 8th - 9th August 2014 | Info available at: ",
          h("a", {
            href: "http://coastingexhibition.wordpress.com"
          }, "http://coastingexhibition.wordpress.com")
        ]),
        h("p", [
          h("b", "Ephemeral"),
          " | Group Exhibition by Level 2 and Level 3 BA Photography students at Falmouth University | 1 week | March 2014 | Falmouth University, TR10 9FE"
        ]),
        h("p", [
          h("b", "Chernobyl Studio Set Design"),
          " | Group Exhibition | 1 week | February 2014 | Falmouth University, TR10 9FE"
        ])
      ])
    ]),

    Home: () => h("div", [
      h("section.gallery", createImagesVirtualDiv("Home")),
    ]),
  };

  const createModalVirtualRoot = (src) => h("div.modalWindow", [
    h("img", {
      oncontextmenu: () => false,
      src
    }),
    h("div.clickArea", {
      onclick: controller.closeModal,
      oncontextmenu: () => false,
    })
  ]);

  var virtualRoot = createVirtualRoot.Home();
  const domRoot = document.querySelector("#mutable_content");
  domRoot.appendChild(createElement(virtualRoot));

  return {
    render: () => {
      var newVirtualRoot;
      if (model.isModal) {
        newVirtualRoot = createModalVirtualRoot(model.getCurrentImage());
      } else {
        var viewName = model.getViewName();
        newVirtualRoot = createVirtualRoot[viewName]();
      }
      patch(domRoot, diff(virtualRoot, newVirtualRoot));
      virtualRoot = newVirtualRoot;
    }
  };
};
