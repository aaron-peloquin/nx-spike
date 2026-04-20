"""
Dev server wrapper that watches for file changes and restarts uvicorn.
Bypasses uvicorn's built-in --reload which breaks under Nx's piped stdio on Windows.
"""
import subprocess
import sys
import os
import time

def find_python():
    """Return the path to the venv python executable."""
    venv_python = os.path.join(os.path.dirname(__file__), ".venv", "Scripts", "python.exe")
    if os.path.exists(venv_python):
        return venv_python
    return sys.executable

def start_server(python_path):
    """Start uvicorn WITHOUT --reload as a subprocess."""
    return subprocess.Popen(
        [python_path, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"],
        cwd=os.path.dirname(__file__) or ".",
    )

def main():
    python_path = find_python()

    # Import watchfiles (installed with uvicorn[standard])
    try:
        from watchfiles import watch
    except ImportError:
        print("watchfiles not installed, running without reload")
        proc = start_server(python_path)
        proc.wait()
        return

    proc = start_server(python_path)
    print(f"[dev] Server started (PID {proc.pid}). Watching for changes...")

    try:
        watch_path = os.path.join(os.path.dirname(__file__), "app")
        for changes in watch(watch_path):
            changed_files = [str(c[1]) for c in changes]
            # Skip __pycache__ changes
            if all("__pycache__" in f for f in changed_files):
                continue
            print(f"\n[dev] Detected changes: {', '.join(os.path.basename(f) for f in changed_files)}")
            print("[dev] Restarting server...")
            proc.terminate()
            try:
                proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                proc.kill()
                proc.wait()
            proc = start_server(python_path)
            print(f"[dev] Server restarted (PID {proc.pid})")
    except KeyboardInterrupt:
        print("\n[dev] Shutting down...")
        proc.terminate()
        proc.wait()

if __name__ == "__main__":
    main()
