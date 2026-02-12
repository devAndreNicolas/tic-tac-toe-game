const { useState } = React;

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(s => s !== null);

  const handleClick = (i) => {
    if (winner || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // Modern UI Styles
  const theme = {
    bg: '#0f172a',
    card: 'rgba(30, 41, 59, 0.7)',
    xColor: '#38bdf8', // Electric Blue
    oColor: '#fb7185', // Rose
    border: 'rgba(255, 255, 255, 0.1)',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.bg,
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ marginBottom: '1rem', letterSpacing: '-0.05em' }}>Tic Tac Toe</h1>

      <div className="status" style={{
        padding: '0.75rem 1.5rem',
        borderRadius: '12px',
        backgroundColor: theme.card,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.border}`,
        marginBottom: '2rem',
        fontWeight: '600',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
      }}>
        {winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : `Next: ${xIsNext ? 'X' : 'O'}`}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 100px)',
        gap: '12px',
        padding: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '20px',
        border: `1px solid ${theme.border}`
      }}>
        {squares.map((val, i) => (
          <button
            key={i}
            className="square"
            onClick={() => handleClick(i)}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              fontSize: '2.5rem',
              fontWeight: '800',
              color: val === 'X' ? theme.xColor : theme.oColor,
              cursor: winner || val ? 'default' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: val ? 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)' : 'none',
            }}
          >
            {val}
          </button>
        ))}
      </div>

      <button
        id="reset"
        onClick={handleReset}
        style={{
          marginTop: '2.5rem',
          padding: '0.8rem 2rem',
          backgroundColor: '#f8fafc',
          color: theme.bg,
          border: 'none',
          borderRadius: '10px',
          fontWeight: '700',
          cursor: 'pointer',
          transition: 'transform 0.1s active',
        }}
      >
        New Game
      </button>
    </div>
  );
}
