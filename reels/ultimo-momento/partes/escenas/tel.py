# CSS común del celular de chat (s08, s09, s11)
def TEL(p):
    return f"""
    $ .{p}-tel {{ position: absolute; left: 300px; top: 580px; width: 500px; height: 800px; border: 7px solid #f4f6fb; border-radius: 56px; background: #0b1d4a; overflow: hidden; }}
    $ .{p}-barra {{ position: absolute; left: 187px; top: 18px; width: 126px; height: 12px; border-radius: 6px; background: #f4f6fb; opacity: 0.6; }}
    $ .{p}-head {{ position: absolute; left: 0; right: 0; top: 46px; padding: 0 30px 16px; border-bottom: 3px solid rgba(244, 246, 251, 0.25); font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; color: #f4f6fb; white-space: nowrap; }}
    $ .{p}-head small {{ display: block; margin-top: 4px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: #f4f6fb; opacity: 0.7; }}
    $ .{p}-burb {{ position: absolute; padding: 16px 22px 12px; border-radius: 24px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 34px; line-height: 1.2; max-width: 400px; }}
    $ .{p}-burb small {{ display: block; margin-top: 6px; text-align: right; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; opacity: 0.8; }}
    $ .{p}-out {{ right: 24px; background: #f4f6fb; color: #050d22; border-bottom-right-radius: 6px; }}
    $ .{p}-in {{ left: 24px; background: #1f4fa8; color: #f4f6fb; border: 3px solid #f4f6fb; border-bottom-left-radius: 6px; }}
"""
