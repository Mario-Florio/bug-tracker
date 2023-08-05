import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "./ResizableGrid.css";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

function ResizableGrid(props) {

    const { bugsListLength } = props;

    const layout1 = [
        { i: "a", x: 0, y: 0, w: 10, h: 15 },
        { i: "b", x: 10, y: 0, w: 10, h: 15 },
        { i: "c", x: 0, y: 10, w: 10, h: 15 }
    ]

    const layout2 = [
        { i: "a", x: 0, y: 0, w: 15, h: 15 },
        { i: "b", x: 15, y: 0, w: 15, h: 15 },
        { i: "c", x: 0, y: 15, w: 15, h: 15 }
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
                <CardHead title={"Bugs"}/>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1.5rem"}}>
                    <p style={{color: "rgb(182, 182, 182)", fontSize: "9rem", margin: "0"}}>{bugsListLength}</p>
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