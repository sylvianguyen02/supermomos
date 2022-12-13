import MockAdapter from "axios-mock-adapter";
import axios from "axios";

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onPost("/post").reply(200, {
  message: "Ok",
  status: true,
});

const postDetail = `<p>Calling all web3 founders and designers for an exciting night of exchanging ideas and making new friends! Come make friends with fellow designers and founders in web3. There will also be lots of insights to be gained through an intimate chat +Q&amp;A with two giants in the industry:<br>Phil Hedayatnia, Founder &amp; CEO of Airfoil, a growth design studio that has designed and built products in web3, the creator economy, the future of work, and much more for 80+ startups since 2018<br>Jihoon Suh, Senior Product Designer at Coinbase, who was previously Senior Product Designer for Messenger for Meta.<br>This will be a curated group with limited spots, so do sign up early!<br>Airfoil Studio is the design, branding, and engineering team helping web3 take flight. As one of crypto’s first large-scale design firms, our mission is to design a friendlier financial layer for the internet. We’re a team of 85+ creatives, working from Airfoil’s hubs in Toronto, Singapore, and Seoul, who’ve worked on 100+ projects since 2018, including Solana Pay, Drift Protocol, Bonfida Solana Name Service, Utopia Labs, Planetarium, Layer3.xyz, MarginFi, Hyperspace, VBA Game, and more.<br>Learn more about Airfoil and our work at airfoil.studio.</p>`;

mock.onGet("/post/1").reply(200, {
  message: "Ok",
  status: true,
  data: {
    approve: true,
    banner: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    capacity: 5000,
    costPerPerson: 1000000,
    date: "12/13/2022",
    description: postDetail,
    location: "Chelsea Market (163 W 20nd Street). Manhattan, NYC",
    name: "Web3 Founders & Designers Mixer + firesidechat with Coinbase SeniorDesigner & Airfoil founder",
    privacy: "public",
    tags: ["1"],
    time: "11:38 PM",
  },
});

export default axios;
