import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "./ResizableGrid.css";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

function ResizableGrid(props) {

    const { bugsList } = props;

    function getPercentages(val) {
        let tracker = 0;

        for (let i = 0; i < bugsList.length; i++) {
            if (bugsList[i].status === val) tracker++;
        }

        let percentage = Math.round((tracker / bugsList.length) * 100) + "%";
        return percentage;
    }

    function getAmount(val) {
        let tracker = 0;

        for (let i = 0; i < bugsList.length; i++) {
            if (bugsList[i].status === val) tracker++;
        }

        return tracker;
    }

    const layout1 = [
        { i: "a", x: 0, y: 0, w: 10, h: 15, isResizable: false },
        { i: "b", x: 10, y: 0, w: 10, h: 15 },
        { i: "c", x: 0, y: 10, w: 10, h: 15 }
    ]

    const layout2 = [
        { i: "a", x: 0, y: 0, w: 15, h: 15 },
        { i: "b", x: 15, y: 0, w: 15, h: 15 },
        { i: "c", x: 0, y: 15, w: 30, h: 15 }
    ]

    const layout3 = [
        { i: "a", x: 0, y: 0, w: 20, h: 15 },
        { i: "b", x: 20, y: 0, w: 20, h: 15 },
        { i: "c", x: 40, y: 0, w: 20, h: 15 }
    ]

    const layout4 = [
        { i: "a", x: 0, y: 0, w: 33, h: 15 },
        { i: "b", x: 33, y: 0, w: 33, h: 15 },
        { i: "c", x: 66, y: 0, w: 33, h: 15 }
    ]

    const layout5 = [
        { i: "a", x: 0, y: 0, w: 40, h: 15 },
        { i: "b", x: 40, y: 0, w: 40, h: 15 },
        { i: "c", x: 80, y: 0, w: 40, h: 15 }
    ]

    const layouts = { lg: layout5, md: layout4, sm: layout3, xs: layout2, xxs: layout1 };

    for (let key of Object.keys(layouts)) {
        layouts[key][0].isResizable = false;
    }
  
    return (
        <ResponsiveGridLayout
            className="layout resizableGrid"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 160, md: 99, sm: 60, xs: 30, xxs: 10 }}
            rowHeight={1}
            compactType={"vertical"}
            isBounded={true}
            resizeHandles={['s', 'e', 'se']}
            margin={[20, 20]}
        >
            <div key="a" className="grid-comp">
                <CardHead title={"Total Bugs"}/>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1.5rem"}}>
                    <p style={{color: "rgb(182, 182, 182)", fontSize: "9rem", margin: "0"}}>{bugsList.length}</p>
                </div>
            </div>
            <div key="c" className="grid-comp">
                <CardHead title={"Bugs by Status"}/>
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", margin: "2.5rem 2rem"}}>
                    <div>
                        <div 
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "140px",
                                height: "140px",
                                backgroundImage: `conic-gradient(rgb(212, 90, 51) 0%, rgb(212, 90, 51) ${getPercentages(1)}, #404040 ${getPercentages(1)}, #404040 100%)`,
                                borderRadius: "50%",
                            }}
                        >
                            <div 
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "110px",
                                    width: "110px",
                                    backgroundColor: "#202020",
                                    borderRadius: "50%"
                                }}
                            >
                                <div>
                                    <p 
                                        style={{                                    
                                            color: "rgb(182, 182, 182)",
                                            fontSize: "2rem",
                                            fontWeight: "500",
                                            textAlign: "center",
                                            margin: "0"
                                        }}
                                    >
                                        {getAmount(1)}
                                    </p>
                                    <h4 style={{textAlign: "center", color: "rgb(130, 130, 130)", margin: "0", fontSize: ".9rem", fontWeight: "400"}}>Not Started</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div 
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "140px",
                                height: "140px",
                                backgroundImage: `conic-gradient(rgb(62, 212, 51) 0%, rgb(62, 212, 51) ${getPercentages(2)}, #404040 ${getPercentages(2)}, #404040 100%)`,
                                borderRadius: "50%",
                            }}
                        >
                            <div 
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "110px",
                                    width: "110px",
                                    backgroundColor: "#202020",
                                    borderRadius: "50%"
                                }}
                            >
                                <div>
                                    <p 
                                        style={{                                    
                                            color: "rgb(182, 182, 182)",
                                            fontSize: "2rem",
                                            fontWeight: "500",
                                            textAlign: "center",
                                            margin: "0"
                                        }}
                                    >
                                        {getAmount(2)}
                                    </p>
                                    <h4 style={{textAlign: "center", color: "rgb(130, 130, 130)", margin: "0", fontSize: ".9rem", fontWeight: "400"}}>In Progress</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div 
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "140px",
                                height: "140px",
                                backgroundImage: `conic-gradient(rgb(148, 148, 148) 0%, rgb(148, 148, 148) ${getPercentages(3)}, #404040 ${getPercentages(3)}, #404040 100%)`,
                                borderRadius: "50%",
                            }}
                        >
                            <div 
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "110px",
                                    width: "110px",
                                    backgroundColor: "#202020",
                                    borderRadius: "50%"
                                }}
                            >
                                <div>
                                    <p 
                                        style={{                                    
                                            color: "rgb(182, 182, 182)",
                                            fontSize: "2rem",
                                            fontWeight: "500",
                                            textAlign: "center",
                                            margin: "0"
                                        }}
                                    >
                                        {getAmount(3)}
                                    </p>
                                    <h4 style={{textAlign: "center", color: "rgb(130, 130, 130)", margin: "0", fontSize: ".9rem", fontWeight: "400"}}>Resolved</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ResponsiveGridLayout>
    );
}

export default ResizableGrid;

function CardHead(props) {

    const { title } = props;

    return(
        <>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h3 style={{color: "rgb(182, 182, 182)", fontWeight: "500", margin: ".7em"}}>{title}</h3>
                <div style={{display: "flex", margin: ".1em .6em", padding: ".6em .1em", cursor: "grab"}}>
                    <div style={{backgroundColor: "#696969", margin: ".1em", height: "2px", width: "2px", borderRadius: "5px"}}></div>
                    <div style={{backgroundColor: "#696969", margin: ".1em", height: "2px", width: "2px", borderRadius: "5px"}}></div>
                    <div style={{backgroundColor: "#696969", margin: ".1em", height: "2px", width: "2px", borderRadius: "5px"}}></div>
                </div>
            </div>
        </>
    );
}