(function () {
  var getStylesFor = window.IRVis.getStylesFor;
  var visOptions   = window.IRVis.visOptions;

  var formatEdge = function (e) {
    var styles = getStylesFor(e, "defEdge");
    styles.color = { color: styles.color, highlight: styles.color };
    return Object.assign({
      id:    e.uid,
      from:  e.src,
      to:    e.tgt,
      label: e.id
    }, styles);
  };

  var formatNode = function (n) {
    var styles = getStylesFor(n, "defNode");
    return Object.assign({
      id: n.uid,
      label: n.name ? n.id + ': ' + n.name : n.id
    }, styles);
  };

  var formatWith = function (col, formatter) {
    var res = {};
    for (prop in col) {
      if (col.hasOwnProperty(prop)) {
        res[prop] = formatter(col[prop]);
      }
    }
    return res;
  };

  var visDataForStep = function (data, steps, stepNumber) {
    var res = { nodes: new vis.DataSet([]), edges: new vis.DataSet([]) };
    console.log(steps);
    steps.slice(0, stepNumber + 1).forEach(function (step) {
        console.log(step);
        step.mkEdges.forEach(function (e) { res.edges.add(data.edges[e]); });
        step.rmEdges.forEach(function (e) { res.edges.remove(e); });
        step.mkNodes.forEach(function (n) { res.nodes.add(data.nodes[n]); });
        step.rmNodes.forEach(function (n) { res.nodes.remove(n); });
    });
    return res;
  }

  var init = function (cfg, container) {
    var data = { nodes: formatWith(cfg.nodes, formatNode), edges: formatWith(cfg.edges, formatEdge) };
    var emptyVisdata = { nodes: new vis.DataSet([]), edges: new vis.DataSet([]) };
    var network = new vis.Network(container, emptyVisdata, visOptions);
    return {
      setStep: function (s) {
        console.log(s);
        var visData = visDataForStep(data, cfg.steps, s);
        console.log(visData);
        network.setData(visData);
      }
    }
  }

  if (!window.IRVis) window.IRVis = {};
  window.IRVis.graphController = init;
})();