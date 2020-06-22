// First undefine 'gaussian' so we can easily reload this file.
require.undef("gaussian");

define("gaussian", ["d3"], function (d3) {
  function Random_normal_Dist(mean, sd) {
    let data = [];
    for (var i = mean - 4 * sd; i < mean + 4 * sd; i += 1) {
      var q = i;
      var p = jStat.normal.pdf(i, mean, sd);
      var arr = {
        q: q,
        p: p,
      };
      data.push(arr);
    }
    return data;
  }

  function draw(container, arr_1, arr_2, arr_3, width, height) {
    var margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = width - margin.left - margin.right,
      height = height - margin.top - margin.bottom;

    // var array1 = Random_normal_Dist(0, 1);
    // var array2 = Random_normal_Dist(2, 2);
    var array1 = arr_1;
    var array2 = arr_2;
    var array3 = arr_3;

    var x = d3.scaleLinear().rangeRound([0, width]);

    //Min q
    var d1 = d3.min(array1, function (d) {
      return d.q;
    });
    var d2 = d3.min(array2, function (d) {
      return d.q;
    });
    var min_d = d3.min([d1, d2]);

    //Max q
    d1 = d3.max(array1, function (d) {
      return d.q;
    });
    d2 = d3.max(array2, function (d) {
      return d.q;
    });
    var max_d = d3.max([d1, d2]);

    //Max p
    d1 = d3.max(array1, function (d) {
      return d.p;
    });
    d2 = d3.max(array2, function (d) {
      return d.p;
    });
    var max_p = d3.max([d1, d2]);

    x.domain([min_d, max_d + 1]).nice;

    var y = d3.scaleLinear().domain([0, max_p]).range([height, 0]);

    var svg = d3
      .select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var gX = svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    var gY = svg.append("g").attr("class", "y axis").call(d3.axisLeft(y));

    var line = d3
      .line()
      .curve(d3.curveBasis)
      .x(function (d) {
        return x(d.q);
      })
      .y(function (d) {
        return y(d.p);
      });

    svg
      .append("path")
      .datum(array1)
      .attr("class", "line")
      //   .attr("fill", "none")
      .attr("d", line)
      .attr("fill", "#ff5454")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .style("opacity", "0.5")
      .on("mouseover", function () {
        d3.select(this)
          .interrupt("fade")
          .style("fill", "#ff0404")
          .style("opacity", 1)
          .attr("r", function (d) {
            return 1.1 * d + 10;
          });
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition("fade")
          .duration(500)
          .style("fill", "#ff5454")
          .style("opacity", 0.7)
          .attr("r", function (d) {
            return d;
          });
      })
      .transition()
      .duration(2000)
      .attr("r", function (d) {
        return d;
      });

    svg
      .append("path")
      .datum(array2)
      //   .attr("fill", "none")
      .attr("fill", "#4393c3")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("d", line)
      .style("opacity", "0.5")
      .on("mouseover", function () {
        d3.select(this)
          .interrupt("fade")
          .style("fill", "#009fff")
          .style("opacity", 1)
          .attr("r", function (d) {
            return 1.1 * d + 10;
          });
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition("fade")
          .duration(500)
          .style("fill", "#4393c3")
          .style("opacity", 0.7)
          .attr("r", function (d) {
            return d;
          });
      })
      .transition()
      .duration(2000)
      .attr("r", function (d) {
        return d;
      });

    svg
      .append("path")
      .datum(array3)
      //   .attr("fill", "none")
      .attr("fill", "#ff850e")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("d", line)
      .style("opacity", "0.5")
      .on("mouseover", function () {
        d3.select(this)
          .interrupt("fade")
          .style("fill", "#ff850e")
          .style("opacity", 1)
          .attr("r", function (d) {
            return 1.1 * d + 10;
          });
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition("fade")
          .duration(500)
          .style("fill", "#ff850e")
          .style("opacity", 0.7)
          .attr("r", function (d) {
            return d;
          });
      })
      .transition()
      .duration(2000)
      .attr("r", function (d) {
        return d;
      });

    //     width = width || 600;
    //     height = height || 200;
    //     var svg = d3
    //       .select(container)
    //       .append("svg")
    //       .attr("width", width)
    //       .attr("height", height)
    //       .append("g");

    //     var x = d3
    //       .scaleLinear()
    //       .domain([0, data.length - 1])
    //       .range([50, width - 50]);

    //     var gaussian = svg.selectAll("circle").data(data);

    //     gaussian
    //       .enter()
    //       .append("circle")
    //       .attr("cx", function (d, i) {
    //         return x(i);
    //       })
    //       .attr("cy", height / 2)
    //       .attr("r", 20)
    //       .style("fill", "#1f77b4")
    //       .style("opacity", 0.7)
    //       .on("mouseover", function () {
    //         d3.select(this)
    //           .interrupt("fade")
    //           .style("fill", "#ff850e")
    //           .style("opacity", 1)
    //           .attr("r", function (d) {
    //             return 1.1 * d + 10;
    //           });
    //       })
    //       .on("mouseout", function () {
    //         d3.select(this)
    //           .transition("fade")
    //           .duration(500)
    //           .style("fill", "#1f77b4")
    //           .style("opacity", 0.7)
    //           .attr("r", function (d) {
    //             return d;
    //           });
    //       })
    //       .transition()
    //       .duration(2000)
    //       .attr("r", function (d) {
    //         return d;
    //       });
  }

  return draw;
});

element.append("loaded gaussian model");
