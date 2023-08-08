import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "./ResizableGrid.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import layouts from "./layouts";

const ResponsiveGridLayout = WidthProvider(Responsive);

function ResizableGrid(props) {

    const { bugsList } = props;

    return (
        <ResponsiveGridLayout
            className="layout resizableGrid"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 160, md: 99, sm: 60, xs: 30, xxs: 10 }}
            rowHeight={1}
            compactType={"vertical"}
            isBounded={true}
            isResizable={false}
            resizeHandles={['s', 'e', 'se']}
            margin={[20, 20]}
        >
            <div key="totalBugs_widget" className="grid-comp">
                <CardHead title={"Total Bugs"}/>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1.5rem"}}>
                    <p style={{color: "rgb(182, 182, 182)", fontSize: "9rem", margin: "0"}}>{bugsList.length}</p>
                </div>
            </div>
            <div key="bugsStatus_widget" className="grid-comp">
                <CardHead title={"Bugs by Status"}/>
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", margin: "1.5rem 1rem"}}>
                    <Pie status={"Not Started"} bugsList={bugsList}/>
                    <Pie status={"In Progress"} bugsList={bugsList}/>
                    <Pie status={"Resolved"} bugsList={bugsList}/>
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
            <div style={{position: "sticky", top: "0", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#252525"}}>
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

function Pie(props) {

    const { status, bugsList} = props;

    const val = status === "Not Started" ? 1 : status === "In Progress" ? 2 : 3;
    const color = status === "Not Started" ? "rgb(212, 90, 51)" : status === "In Progress" ? "rgb(62, 212, 51)" : "rgb(148, 148, 148)";

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

    return(
        <div 
            // abstract styling into dynamic classNames?
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1rem 1rem",
                width: "140px",
                height: "140px",
                backgroundImage: `conic-gradient(${color} 0%, ${color} ${getPercentages(val)}, #404040 ${getPercentages(val)}, #404040 100%)`,
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
                        {getAmount(val)}
                    </p>
                    <h4 style={{textAlign: "center", color: "rgb(130, 130, 130)", margin: "0", fontSize: ".9rem", fontWeight: "400"}}>
                        {status}
                    </h4>
                </div>
            </div>
        </div>
    );
}