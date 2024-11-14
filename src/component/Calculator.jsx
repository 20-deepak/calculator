import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Box,
} from "@mui/material";
import {
  OPERATOR_REGEX,
  OPERATOR_KEYS,
  OPERATORS_KEYS,
  REGEX_SQRT,
  REGEX_PERCENT,
  SANITIZE_EXPR,
  BUTTONS,
} from "../constant/Constant";
import "./Calculator.css";

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [memory, setMemory] = useState("");

  const handleDigitClick = (digit) => {
    setCurrentInput(currentInput + digit);
    setResult("");
  };

  const handleOperatorClick = (operator) => {
    if (operator === "√") {
      if (currentInput) {
        setExpression(expression + `√${currentInput}`);
        setCurrentInput("");
      } else {
        setExpression(expression + "√");
      }
    } else if (operator === "%") {
      if (currentInput) {
        setExpression(expression + `${currentInput}%`);
        setCurrentInput("");
      } else if (expression) {
        setExpression(expression + "%");
      }
    } else {
      if (currentInput) {
        setExpression(expression + currentInput + operator);
        setCurrentInput("");
      } else if (expression && OPERATOR_REGEX.test(expression)) {
        setExpression(expression.slice(0, -1) + operator);
      }
    }
    setCurrentInput("");
  };

  const calculateResult = () => {
    try {
      let expr = expression + currentInput;
      expr = expr.replace(REGEX_SQRT, "Math.sqrt($1)");
      expr = expr.replace(REGEX_PERCENT, "($1/100)");
      const sanitizedExpr = expr.replace(SANITIZE_EXPR, "");
      // eslint-disable-next-line no-eval
      let res = eval(sanitizedExpr);
      res =
        res === Infinity || res === -Infinity
          ? "Error"
          : parseFloat(res.toFixed(10));
      setResult(res);
      setExpression("");
      setCurrentInput("");
    } catch (error) {
      setResult("Error");
    }
  };

  const handleMemorySave = () => {
    if (result) {
      setMemory(result.toString());
    } else if (currentInput) {
      setMemory(currentInput);
    }
  };

  const handleMemoryRecall = () => {
    if (memory) {
      setCurrentInput(memory);
      setResult("");
    }
  };

  const handleMemoryClear = () => {
    setMemory("");
    setResult("0");
  };

  const handleClear = () => {
    setCurrentInput("");
    setExpression("");
    setResult("");
  };

  const handleBackspace = () => {
    if (currentInput) {
      setCurrentInput(currentInput.slice(0, -1));
    } else if (expression) {
      setExpression(expression.slice(0, -1));
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if (!isNaN(key)) handleDigitClick(key);
      else if (OPERATORS_KEYS.includes(key)) handleOperatorClick(key);
      else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculateResult();
      } else if (key === "Backspace") {
        handleBackspace();
      } else if (key === "Escape" || key.toLowerCase() === "c") {
        handleClear();
      } else if (key === ".") {
        handleDigitClick(".");
      } else if (key === "%") {
        handleOperatorClick("%");
      } else if (key === "√") {
        handleOperatorClick("√");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInput, expression]);

  return (
    <Container maxWidth="xs" className="container">
      <Box className="box">
        <Typography variant="h4" align="center" gutterBottom className="title">
          Calculator
        </Typography>
        <Box className="display-box">
          <TextField
            variant="outlined"
            fullWidth
            value={result || expression + currentInput || "0"}
            InputProps={{
              readOnly: true,
              classes: {
                input: "display-text",
              },
              inputProps: {
                style: { textAlign: "right" },
              },
            }}
          />
        </Box>
        <Grid container spacing={1}>
          {BUTTONS.map((val) => (
            <Grid item xs={3} key={val}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  switch (val) {
                    case "=":
                      calculateResult();
                      break;
                    case "DEL":
                      handleBackspace();
                      break;
                    case "CLEAR":
                      handleClear();
                      break;
                    case "MS":
                      handleMemorySave();
                      break;
                    case "MR":
                      handleMemoryRecall();
                      break;
                    case "MC":
                      handleMemoryClear();
                      break;
                    case "√":
                    case "%":
                    case "+":
                    case "-":
                    case "*":
                    case "/":
                      handleOperatorClick(val);
                      break;
                    default:
                      handleDigitClick(val);
                      break;
                  }
                }}
                className={`button
          ${
            OPERATOR_KEYS.includes(val)
              ? "operator-button"
              : val === "DEL"
              ? "del-button"
              : val === "CLEAR"
              ? "clear-button"
              : "number-button"
          }
          ${val === "√" ? "sqrt-button" : ""}`}
              >
                {val}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Calculator;
