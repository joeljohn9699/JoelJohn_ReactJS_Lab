import { useEffect, useState } from "react";
import { IDataList } from "../model/IDataList";
import { getDataFromServer } from "../services/main";
import ExpenseTracker from "./ExpenseTracker";

function ShowList() {

    const [showForm, setShowForm] = useState(false);
    const [items, setItems] = useState<IDataList[]>([]);
    const [sum, setSum] = useState<number>(0);
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [error, setError] = useState<Error | null>(null);

    let rahulSpent1: number = 0;
    let rameshSpent1: number = 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result, value) => (result = result + value.price), 0));
                Shares(data);

            } catch (error: any) {
                setError(error);
            }
        };

        fetchData();

    }, [showForm]);

    const Shares = (data: IDataList[]) => {
        data.map((share) =>
            share.payeeName === "Rahul" ? (rahulSpent1 = rahulSpent1 + share.price) : (rameshSpent1 = rameshSpent1 + share.price)
        );

        setRahulSpent(rahulSpent1);
        setRameshSpent(rameshSpent1);
    }

    const success = () => {
        setShowForm(false);
    }

    const cancel = () => {
        setShowForm(false);
    }

    return (
        <>
            <header id="page-header">
                Expense Tracker
            </header>

            <button id="add-button" onClick={() => setShowForm(true)}> Add </button>

            {
                showForm && (
                    <ExpenseTracker onTrue={success} onClose={cancel} />
                )
            }

            <>
                <div className="use-inline date header-color"> Date </div>
                <div className="use-inline header-color"> Product Purchased </div>
                <div className="use-inline price header-color"> Price </div>
                <div className="use-inline header-color" style={{ width: 112 }}> Payee </div>
            </>

            {
                items && items.map(
                    (user, idx) => (
                        <div key={idx}>
                            <div className="use-inline date">{user.setDate}</div>
                            <div className="use-inline">{user.product}</div>
                            <div className="use-inline price">{user.price}</div>
                            <div className="use-inline">{user.payeeName}</div>
                        </div>
                    )
                )
            }

            <hr />

            <div className="use-inline"> Total: </div>
            <span className="use-inline total">{sum}</span> <br />

            <div className="use-inline"> Rahul Paid: </div>
            <span className="use-inline total rahul">{rahulSpent}</span> <br />

            <div className="use-inline"> Ramesh Paid: </div>
            <span className="use-inline total ramesh">{rameshSpent}</span> <br />

            <span className="use-inline payable">
                {rahulSpent > rameshSpent ? "Pay Rahul" : "Pay Ramesh"}
            </span>

            <span className="use-inline payable price">
                {""}
                {Math.abs(rahulSpent - rameshSpent) / 2}
            </span>

            {error && <> {error?.message}</>}
        </>
    )
}

export default ShowList;