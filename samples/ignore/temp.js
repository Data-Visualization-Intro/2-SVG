let test = {
  data11: {
    transitions: [
      {
        count: "17",
        "toPage-2": "Document-2",
        "fromPage-1": "Document-1",
      },
      {
        count: "10",
        "toPage-3": "Document-1",
        "fromPage-2": "Document-2",
      },
      {
        count: "6",
        "toPage-4": "Document-3",
        "fromPage-3": "Document-1",
      },
      {
        count: "1",
        "toPage-5": "Document-3",
        "fromPage-4": "Document-3",
      },
    ],
  },
};

let data = [];

test.data11.transitions.map((item, index) => {
  item[index];
  data.push([item["toPage-2"], item["fromPage-1"], item.count]);
});

console.log(data);
