import { Inter as FontSans } from "next/font/google";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { useEffect, useState } from "react";
import axios from "axios";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const [toggleValue, setToggleValue] = useState("");
  const [output, setOutput] = useState({});
  const [data, setData] = useState("{'data': ['a', 'b']}");

  useEffect(() => {
    console.log(toggleValue);
  }, [toggleValue]);

  async function callApi(data) {
    const response = await axios.post("http://127.0.0.1:3000/bfhl", data);
    setOutput(response.data);
  }

  return (
    <main
      className={cn(
        `flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`
      )}
    >
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="flex flex-col gap-2 w-96">
          <Input
            onChange={(e) => setData(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <Button
            className="w-full"
            onClick={() => {
              callApi(JSON.parse(data));
            }}
          >
            Submit
          </Button>
          <ToggleGroup
            value={toggleValue}
            onValueChange={setToggleValue}
            type="multiple"
            className="w-full flex justify-between"
          >
            <ToggleGroupItem value="a">Numbers</ToggleGroupItem>
            <ToggleGroupItem value="b">Alphabets</ToggleGroupItem>
            <ToggleGroupItem value="c">Hightest Character</ToggleGroupItem>
          </ToggleGroup>

          <h2 className="">Filter Response</h2>
          {!toggleValue.includes("a") ? (
            <></>
          ) : (
            <h3>Numbers: {output.numbers.join(", ")}</h3>
          )}
          {!toggleValue.includes("b") ? (
            <></>
          ) : (
            <h3>Alphabets: {output.alphabets.join(", ")}</h3>
          )}
          {!toggleValue.includes("c") ? (
            <></>
          ) : (
            <h3>
              Highest Lowercase Character:{" "}
              {output.highest_lowercase_alphabet.join(", ")}
            </h3>
          )}
        </div>
      </div>
    </main>
  );
}
