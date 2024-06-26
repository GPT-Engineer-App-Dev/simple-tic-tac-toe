import React, { useState } from 'react';
import { Container, VStack, Button, Grid, GridItem, Text, Box } from "@chakra-ui/react";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  const renderSquare = (index) => (
    <Button h="100px" w="100px" onClick={() => handleClick(index)} fontSize="2xl">
      {board[index]}
    </Button>
  );

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl" mb={4}>{status}</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={1}>
          {board.map((_, index) => (
            <GridItem key={index}>
              {renderSquare(index)}
            </GridItem>
          ))}
        </Grid>
        <Button mt={4} onClick={() => setBoard(Array(9).fill(null))}>Restart Game</Button>
      </VStack>
    </Container>
  );
};

export default Index;